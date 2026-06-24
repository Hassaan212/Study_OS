/**
 * AI Service
 * 
 * Central service for all AI interactions in StudyOS.
 * This abstraction allows easy switching between providers (Gemini, OpenAI, etc.)
 * without changing frontend code.
 */

import type { AIProvider, AIMessage, AIResponse, AIProviderType } from './providers/types';
import { GeminiProvider } from './providers/gemini';
import { STUDY_ASSISTANT_SYSTEM_PROMPT } from './prompts';

class AIService {
  private provider: AIProvider | null = null;
  private providerType: AIProviderType = 'gemini';

  /**
   * Initialize the AI service with the appropriate provider
   */
  initialize(providerType: AIProviderType, apiKey: string): void {
    this.providerType = providerType;

    switch (providerType) {
      case 'gemini':
        this.provider = new GeminiProvider(apiKey);
        break;
      
      // Future: Add OpenAI provider
      // case 'openai':
      //   this.provider = new OpenAIProvider(apiKey);
      //   break;

      default:
        throw new Error(`Unsupported AI provider: ${providerType}`);
    }
  }

  /**
   * Generate a chat completion
   */
  async chat(messages: AIMessage[]): Promise<AIResponse> {
    if (!this.provider) {
      throw new Error('AI service not initialized. Call initialize() first.');
    }

    return this.provider.generateChatCompletion(messages, {
      systemPrompt: STUDY_ASSISTANT_SYSTEM_PROMPT,
      temperature: 0.7,
      maxTokens: 8000, // Increased from 1000 to support longer responses
    });
  }

  /**
   * Get the current provider type
   */
  getProviderType(): AIProviderType {
    return this.providerType;
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.provider !== null;
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export types for convenience
export type { AIMessage, AIResponse, AIProviderType };
