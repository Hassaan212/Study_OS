/**
 * Gemini AI Provider
 * 
 * Implementation of the AI provider interface using Google's Gemini API.
 * This is the current development provider for StudyOS.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIProvider, AIMessage, AIResponse, AIGenerationOptions } from './types';

export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string;
  private maxRetries: number = 3;
  private retryDelay: number = 2000; // Start with 2 seconds for 503 errors

  constructor(apiKey: string, model: string = 'models/gemini-2.5-flash') {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model;
    
    console.log('🚀 Gemini Provider initialized');
    console.log('   Model:', this.model);
    console.log('   SDK Version: @google/generative-ai ^0.24.1');
    console.log('   Max Retries:', this.maxRetries);
    console.log('   Retry Strategy: Exponential backoff (2s, 4s, 8s)');
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: any): boolean {
    // Retry on 503 (Service Unavailable), 429 (Rate Limit), 500 (Server Error)
    const retryableStatuses = [503, 429, 500, 502, 504];
    
    if (error.status && retryableStatuses.includes(error.status)) {
      return true;
    }
    
    // Retry on network errors
    if (error.message?.includes('network') || 
        error.message?.includes('timeout') ||
        error.message?.includes('ECONNRESET') ||
        error.message?.includes('ETIMEDOUT')) {
      return true;
    }
    
    return false;
  }

  async generateChatCompletion(
    messages: AIMessage[],
    options?: AIGenerationOptions
  ): Promise<AIResponse> {
    // Try with retries
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`\n🔄 Attempt ${attempt}/${this.maxRetries}`);
        return await this.attemptChatCompletion(messages, options);
      } catch (error: any) {
        console.error(`❌ Attempt ${attempt} failed:`, error.message);
        
        // If this is the last attempt, or error is not retryable, throw
        if (attempt === this.maxRetries || !this.isRetryableError(error)) {
          console.error('🚫 Max retries reached or non-retryable error. Giving up.');
          
          // Return user-friendly error
          return {
            message: '',
            error: 'StudyOS AI is temporarily busy. Please try again in a few seconds.',
          };
        }
        
        // Calculate exponential backoff delay
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await this.sleep(delay);
      }
    }
    
    // Should never reach here, but just in case
    return {
      message: '',
      error: 'StudyOS AI is temporarily busy. Please try again in a few seconds.',
    };
  }

  /**
   * Actual chat completion attempt (without retry logic)
   */
  private async attemptChatCompletion(
    messages: AIMessage[],
    options?: AIGenerationOptions
  ): Promise<AIResponse> {
    try {
      console.log('\n=== GEMINI REQUEST DEBUG (START) ===');
      console.log('Total messages received:', messages.length);
      console.log('Messages array:', JSON.stringify(messages, null, 2));
      
      // Initialize the model
      const model = this.client.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: options?.maxTokens ?? 8000,
        },
      });

      // Convert messages to Gemini format
      const history = this.convertMessagesToGeminiFormat(messages, options?.systemPrompt);
      
      console.log('Converted history length:', history.length);
      console.log('Full Gemini history:', JSON.stringify(history, null, 2));
      
      // Validate history - check for alternating pattern
      console.log('\n=== VALIDATING HISTORY ===');
      for (let i = 0; i < history.length; i++) {
        const msg = history[i];
        console.log(`Message ${i}: role="${msg.role}", parts count=${msg.parts.length}, text length=${msg.parts[0]?.text?.length || 0}`);
        
        // Check for invalid roles
        if (!msg.role || (msg.role !== 'user' && msg.role !== 'model')) {
          console.error(`❌ INVALID ROLE at index ${i}:`, msg.role);
        }
        
        // Check for empty content
        if (!msg.parts || msg.parts.length === 0 || !msg.parts[0]?.text) {
          console.error(`❌ INVALID PARTS at index ${i}:`, msg.parts);
        }
        
        // Check alternating pattern
        if (i > 0) {
          const prevRole = history[i - 1].role;
          const currRole = msg.role;
          if (prevRole === currRole) {
            console.error(`❌ ALTERNATING VIOLATION at index ${i}: ${prevRole} followed by ${currRole}`);
          }
        }
      }
      
      // CRITICAL FIX: Don't split history for multi-turn
      // Use startChat with complete history, send only current message
      const currentUserMessage = history[history.length - 1];
      const conversationHistory = history.slice(0, -1);
      
      console.log('\n=== CHAT INITIALIZATION ===');
      console.log('Conversation history length:', conversationHistory.length);
      console.log('Current message to send:', JSON.stringify(currentUserMessage, null, 2));
      
      // Verify last message in history is 'model' and current is 'user'
      if (conversationHistory.length > 0) {
        const lastHistoryMsg = conversationHistory[conversationHistory.length - 1];
        console.log('Last message in history: role="' + lastHistoryMsg.role + '"');
        console.log('Current message: role="' + currentUserMessage.role + '"');
        
        if (lastHistoryMsg.role === 'user' && currentUserMessage.role === 'user') {
          console.error('❌ CRITICAL: Two consecutive user messages detected!');
        }
      }
      
      console.log('\n=== GEMINI PAYLOAD (BEFORE API CALL) ===');
      console.log('Role sequence:', conversationHistory.map(h => h.role).join(' -> '), '-> (sending) ->', currentUserMessage.role);
      console.log('Message count in history:', conversationHistory.length);
      console.log('Complete request payload:');
      console.log('  history:', JSON.stringify(conversationHistory, null, 2));
      console.log('  current message:', JSON.stringify(currentUserMessage, null, 2));
      console.log('==================================\n');
      
      console.log('\n=== SENDING TO GEMINI ===');
      const chat = model.startChat({
        history: conversationHistory,
      });

      // Extract text from the current message parts
      const messageText = currentUserMessage.parts[0].text;
      console.log('Sending message text:', messageText.substring(0, 100) + '...');
      
      const result = await chat.sendMessage(messageText);
      
      console.log('\n=== GEMINI RESPONSE (RAW) ===');
      console.log('Raw result object:', result);
      console.log('==================================\n');
      
      const response = await result.response;
      const text = response.text();

      // Logging for debugging response completeness
      console.log('\n=== GEMINI RESPONSE DEBUG ===');
      console.log('Model:', this.model);
      console.log('Max Output Tokens:', options?.maxTokens ?? 8000);
      console.log('Response Character Count:', text.length);
      console.log('Response First 200 chars:', text.substring(0, 200));
      console.log('Response Last 200 chars:', text.substring(Math.max(0, text.length - 200)));
      
      // Check if response has usage metadata
      if (response.usageMetadata) {
        console.log('Usage Metadata:', {
          promptTokens: response.usageMetadata.promptTokenCount,
          outputTokens: response.usageMetadata.candidatesTokenCount,
          totalTokens: response.usageMetadata.totalTokenCount,
        });
      }
      
      // Check finish reason
      const candidate = response.candidates?.[0];
      if (candidate) {
        console.log('Finish Reason:', candidate.finishReason);
        if (candidate.finishReason === 'MAX_TOKENS') {
          console.warn('⚠️ WARNING: Response was truncated due to MAX_TOKENS limit');
        }
      }
      console.log('=== END DEBUG ===\n');

      return {
        message: text,
      };
    } catch (error: any) {
      console.error('\n=== GEMINI ERROR - DETAILED ===');
      console.error('Model Used:', this.model);
      console.error('SDK Version: @google/generative-ai ^0.24.1');
      console.error('Status Code:', error.status || 'N/A');
      console.error('Status Text:', error.statusText || 'N/A');
      console.error('Error Message:', error.message);
      console.error('Error Name:', error.name);
      console.error('Error Code:', error.code);
      
      // Parse Gemini-specific error details
      if (error.message) {
        const match = error.message.match(/\[(\d+)\s+([^\]]+)\]/);
        if (match) {
          console.error('Parsed Status:', match[1], match[2]);
        }
      }
      
      // Try to extract response body
      if (error.response) {
        console.error('Provider Response:', error.response);
      }
      if (error.errorDetails) {
        console.error('Error Details:', JSON.stringify(error.errorDetails, null, 2));
      }
      
      console.error('Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      console.error('=== END GEMINI ERROR ===\n');
      
      // Re-throw to let retry logic handle it
      throw error;
    }
  }

  /**
   * Convert standard AIMessage format to Gemini's chat history format
   * CRITICAL: Must maintain strict user->model->user->model alternation
   */
  private convertMessagesToGeminiFormat(
    messages: AIMessage[],
    systemPrompt?: string
  ): Array<{ role: string; parts: Array<{ text: string }> }> {
    console.log('\n=== MESSAGE CONVERSION DEBUG ===');
    console.log('Input messages count:', messages.length);
    console.log('System prompt provided:', !!systemPrompt);
    
    const history: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add system prompt as the first user message if provided
    if (systemPrompt) {
      console.log('Adding system prompt exchange to history');
      history.push({
        role: 'user',
        parts: [{ text: systemPrompt }],
      });
      history.push({
        role: 'model',
        parts: [{ text: 'Understood. I will act as your AI Study Assistant for StudyOS.' }],
      });
    }

    // Convert messages - MUST maintain alternating user/model pattern
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      // Validate message has content
      if (!message || !message.content || message.content.trim() === '') {
        console.warn(`⚠️ Skipping empty message at index ${i}`);
        continue;
      }
      
      console.log(`Converting message ${i}: role="${message.role}", content length=${message.content.length}`);
      
      // Skip system messages as they're handled separately
      if (message.role === 'system') {
        console.log(`  -> Skipping system message at index ${i}`);
        continue;
      }

      // Convert role: 'assistant' -> 'model', 'user' stays 'user'
      const geminiRole = message.role === 'assistant' ? 'model' : 'user';
      console.log(`  -> Mapped role "${message.role}" to "${geminiRole}"`);
      
      // Ensure content is plain text string
      const textContent = typeof message.content === 'string' 
        ? message.content 
        : String(message.content);
      
      history.push({
        role: geminiRole,
        parts: [{ text: textContent }],
      });
    }

    // Validate final history
    console.log('Final history count:', history.length);
    console.log('Role sequence:', history.map(h => h.role).join(' -> '));
    
    // Check for alternating pattern
    for (let i = 1; i < history.length; i++) {
      if (history[i].role === history[i - 1].role) {
        console.error(`❌ ALTERNATION ERROR: ${history[i - 1].role} followed by ${history[i].role} at positions ${i - 1} and ${i}`);
      }
    }
    
    console.log('=== END CONVERSION DEBUG ===\n');
    
    return history;
  }
}
