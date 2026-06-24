/**
 * AI Provider Types
 * 
 * These types define the interface that all AI providers must implement.
 * This allows for easy switching between providers (Gemini, OpenAI, etc.)
 */

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  message: string;
  error?: string;
}

export interface AIProvider {
  /**
   * Generate a chat completion
   * @param messages - Array of conversation messages
   * @param options - Optional configuration
   */
  generateChatCompletion(
    messages: AIMessage[],
    options?: AIGenerationOptions
  ): Promise<AIResponse>;
}

export interface AIGenerationOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export type AIProviderType = 'gemini' | 'openai';
