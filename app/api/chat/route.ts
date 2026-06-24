/**
 * AI Chat API Route
 * 
 * Secure server-side API for AI chat functionality.
 * Uses provider abstraction to support multiple AI providers (Gemini, OpenAI, etc.)
 * 
 * SECURITY:
 * - Server-side execution only
 * - API keys in environment variables
 * - Input validation
 * - Error handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/aiService';
import type { AIMessage } from '@/lib/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { messages } = await req.json();

    console.log('\n=== API ROUTE DEBUG ===');
    console.log('Received messages count:', messages?.length || 0);
    console.log('Full messages payload:', JSON.stringify(messages, null, 2));

    // Input validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: 'Invalid message format: role and content are required' },
          { status: 400 }
        );
      }
      if (!['user', 'assistant', 'system'].includes(msg.role)) {
        return NextResponse.json(
          { error: 'Invalid message role: must be user, assistant, or system' },
          { status: 400 }
        );
      }
    }

    // Check API key configuration
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API key is not configured' },
        { status: 500 }
      );
    }

    // Initialize AI service with Gemini provider
    // Future: Support provider switching via environment variable
    if (!aiService.isInitialized()) {
      aiService.initialize('gemini', apiKey);
    }

    // Generate AI response
    console.log('Calling aiService.chat() with', messages.length, 'messages');
    const response = await aiService.chat(messages as AIMessage[]);
    console.log('Response received from aiService');
    console.log('=== END API ROUTE DEBUG ===\n');

    // Handle errors from provider
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({ 
      message: response.message,
      provider: aiService.getProviderType(),
    });

  } catch (error: any) {
    console.error('\n=== API ROUTE ERROR (RAW) ===');
    console.error('Full error:', error);
    console.error('error.message:', error.message);
    console.error('error.stack:', error.stack);
    console.error('JSON.stringify:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('=== END API ROUTE ERROR ===\n');
    
    // Return the REAL error message during development
    return NextResponse.json(
      { 
        error: error.message || 'Unknown error',
        details: error.toString(),
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}
