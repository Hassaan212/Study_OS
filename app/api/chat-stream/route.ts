/**
 * AI Chat Streaming API Route
 * 
 * Provides streaming responses for better user experience.
 * Text appears progressively as it's generated.
 */

import { NextRequest } from 'next/server';
import { GeminiProvider } from '@/lib/ai/providers/gemini';
import { STUDY_ASSISTANT_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import type { AIMessage } from '@/lib/ai/providers/types';

export async function POST(req: NextRequest) {
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (parseError: any) {
      console.error('JSON Parse Error:', parseError.message);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = body;

    console.log('\n=== STREAMING API ROUTE ===');
    console.log('Received messages count:', messages?.length || 0);

    // Input validation
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return new Response(
          JSON.stringify({ error: 'Invalid message format: role and content are required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (!['user', 'assistant', 'system'].includes(msg.role)) {
        return new Response(
          JSON.stringify({ error: 'Invalid message role: must be user, assistant, or system' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check API key configuration
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI API key is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Gemini provider
    const provider = new GeminiProvider(apiKey);

    // Create a ReadableStream for Server-Sent Events
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Generate streaming response
          const streamGenerator = provider.generateChatCompletionStream(
            messages as AIMessage[],
            {
              systemPrompt: STUDY_ASSISTANT_SYSTEM_PROMPT,
              temperature: 0.7,
              maxTokens: 8000,
            }
          );

          // Stream chunks to client
          for await (const chunk of streamGenerator) {
            const data = `data: ${JSON.stringify({ chunk })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error: any) {
          console.error('\n=== STREAMING API ERROR ===');
          console.error('Error:', error.message);
          
          // Send error to client
          const errorData = `data: ${JSON.stringify({ error: error.message || 'Streaming failed' })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    // Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('\n=== STREAMING API ROUTE ERROR ===');
    console.error('Error:', error.message);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
