export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  messages: { role: 'user' | 'assistant'; content: string }[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}
