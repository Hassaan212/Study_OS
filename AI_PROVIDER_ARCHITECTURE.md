# StudyOS AI Provider Architecture

## 🎯 Design Philosophy

StudyOS uses a **provider-agnostic architecture** that allows seamless switching between AI providers (Gemini, OpenAI, Claude, etc.) with minimal code changes.

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│              (app/assistant/page.tsx)                   │
│                                                         │
│  - User Interface                                       │
│  - Message Display                                      │
│  - Loading States                                       │
│  - Error Handling                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP POST /api/chat
                     │ { messages: [...] }
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   API ROUTE                             │
│              (app/api/chat/route.ts)                    │
│                                                         │
│  - Input Validation                                     │
│  - Security Checks                                      │
│  - Provider Initialization                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ aiService.chat(messages)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 AI SERVICE                              │
│              (lib/ai/aiService.ts)                      │
│                                                         │
│  - Provider Abstraction Layer                           │
│  - Single Entry Point                                   │
│  - Provider Switching Logic                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ provider.generateChatCompletion()
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 PROVIDERS                               │
│          (lib/ai/providers/*.ts)                        │
│                                                         │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────┐ │
│  │ GeminiProvider │  │ OpenAIProvider │  │  Future  │ │
│  │   (Current)    │  │   (Planned)    │  │ Provider │ │
│  └────────────────┘  └────────────────┘  └──────────┘ │
│                                                         │
│  All implement: AIProvider interface                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL AI APIs                           │
│                                                         │
│   Google Gemini API    OpenAI API    Other APIs        │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Core Components

### 1. **Provider Interface** (`lib/ai/providers/types.ts`)

The contract that all providers must implement:

```typescript
interface AIProvider {
  generateChatCompletion(
    messages: AIMessage[],
    options?: AIGenerationOptions
  ): Promise<AIResponse>;
}
```

**Why this matters**:
- Ensures all providers have the same interface
- Frontend code doesn't need to know which provider is used
- Easy to add new providers

### 2. **AI Service** (`lib/ai/aiService.ts`)

Central service that manages providers:

```typescript
class AIService {
  private provider: AIProvider | null = null;
  
  initialize(providerType: AIProviderType, apiKey: string): void {
    // Create appropriate provider based on type
  }
  
  async chat(messages: AIMessage[]): Promise<AIResponse> {
    // Use active provider
    return this.provider.generateChatCompletion(messages);
  }
}
```

**Why this matters**:
- Single place to switch providers
- Consistent API for all consumers
- Manages provider lifecycle

### 3. **Concrete Providers**

Each provider implements the `AIProvider` interface:

#### Current: Gemini Provider (`lib/ai/providers/gemini.ts`)

```typescript
export class GeminiProvider implements AIProvider {
  async generateChatCompletion(messages, options) {
    // Gemini-specific implementation
    const model = this.client.getGenerativeModel({...});
    const result = await model.generateContent(...);
    return { message: result.text() };
  }
}
```

#### Future: OpenAI Provider (`lib/ai/providers/openai.ts`)

```typescript
export class OpenAIProvider implements AIProvider {
  async generateChatCompletion(messages, options) {
    // OpenAI-specific implementation
    const completion = await this.client.chat.completions.create({...});
    return { message: completion.choices[0].message.content };
  }
}
```

**Why this matters**:
- Each provider handles its own API specifics
- Same interface, different implementations
- Easy to test independently

---

## 🔄 Message Flow

### 1. User Sends Message

```typescript
// Frontend (app/assistant/page.tsx)
const userMessage = {
  role: 'user',
  content: 'Explain photosynthesis'
};

setMessages([...messages, userMessage]);
```

### 2. API Call

```typescript
// Frontend makes HTTP request
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages: allMessages })
});
```

### 3. API Route Processing

```typescript
// API Route (app/api/chat/route.ts)
const { messages } = await req.json();

// Validate input
if (!messages || !Array.isArray(messages)) {
  return error response;
}

// Initialize AI service
aiService.initialize('gemini', process.env.GEMINI_API_KEY);

// Generate response
const response = await aiService.chat(messages);
```

### 4. Provider Selection

```typescript
// AI Service (lib/ai/aiService.ts)
initialize(providerType: 'gemini' | 'openai', apiKey: string) {
  switch (providerType) {
    case 'gemini':
      this.provider = new GeminiProvider(apiKey);
      break;
    case 'openai':
      this.provider = new OpenAIProvider(apiKey);
      break;
  }
}
```

### 5. Provider Execution

```typescript
// Gemini Provider (lib/ai/providers/gemini.ts)
async generateChatCompletion(messages, options) {
  const model = this.client.getGenerativeModel({...});
  const chat = model.startChat({ history: [...] });
  const result = await chat.sendMessage(lastMessage);
  return { message: result.response.text() };
}
```

### 6. Response Return

```typescript
// Returns through layers:
Provider → AIService → API Route → Frontend → UI
```

---

## 🔌 Adding a New Provider

### Example: Adding Claude (Anthropic)

#### Step 1: Install SDK

```bash
npm install @anthropic-ai/sdk
```

#### Step 2: Create Provider

Create `lib/ai/providers/claude.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, AIMessage, AIResponse } from './types';

export class ClaudeProvider implements AIProvider {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateChatCompletion(
    messages: AIMessage[],
    options?: AIGenerationOptions
  ): Promise<AIResponse> {
    try {
      const message = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: options?.maxTokens ?? 1000,
        temperature: options?.temperature ?? 0.7,
        system: options?.systemPrompt,
        messages: messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      });

      return {
        message: message.content[0].text
      };
    } catch (error) {
      return {
        message: '',
        error: 'Failed to get AI response.'
      };
    }
  }
}
```

#### Step 3: Update Types

In `lib/ai/providers/types.ts`:

```typescript
export type AIProviderType = 'gemini' | 'openai' | 'claude';
```

#### Step 4: Update AI Service

In `lib/ai/aiService.ts`:

```typescript
import { ClaudeProvider } from './providers/claude';

// In initialize() method:
case 'claude':
  this.provider = new ClaudeProvider(apiKey);
  break;
```

#### Step 5: Update API Route (Optional)

If supporting multiple providers:

```typescript
const providerType = process.env.AI_PROVIDER as AIProviderType || 'gemini';
const apiKey = process.env[`${providerType.toUpperCase()}_API_KEY`];

aiService.initialize(providerType, apiKey);
```

**That's it!** No frontend changes needed.

---

## 🎚️ Configuration Flexibility

### Option 1: Single Provider (Current)

```typescript
// API Route
aiService.initialize('gemini', process.env.GEMINI_API_KEY);
```

### Option 2: Environment-Based Selection

```typescript
// .env.local
AI_PROVIDER=gemini  # or 'openai' or 'claude'
GEMINI_API_KEY=...
OPENAI_API_KEY=...

// API Route
const provider = process.env.AI_PROVIDER || 'gemini';
const apiKey = getApiKeyForProvider(provider);
aiService.initialize(provider, apiKey);
```

### Option 3: User-Based Selection (Future)

```typescript
// Store user preference in database
const userPreference = await getUserAIPreference(userId);
aiService.initialize(userPreference.provider, apiKey);
```

### Option 4: Feature-Based Selection (Future)

```typescript
// Use different providers for different features
if (feature === 'chat') {
  aiService.initialize('gemini', geminiKey);  // Fast & cheap
} else if (feature === 'analysis') {
  aiService.initialize('openai', openaiKey);  // More capable
}
```

---

## 🛡️ Benefits of This Architecture

### 1. **Flexibility**
- Switch providers anytime
- Use multiple providers simultaneously
- A/B test different models

### 2. **Maintainability**
- Changes isolated to provider files
- Frontend unaware of provider details
- Easy to debug and test

### 3. **Scalability**
- Add new providers without refactoring
- Support provider-specific features
- Handle different rate limits

### 4. **Cost Optimization**
- Use cheapest provider for simple tasks
- Use powerful provider for complex tasks
- Switch if pricing changes

### 5. **Risk Mitigation**
- Fallback to another provider if one fails
- No vendor lock-in
- Easy migration

---

## 📦 File Structure

```
lib/ai/
├── providers/
│   ├── types.ts           # Shared interfaces
│   ├── gemini.ts          # Gemini implementation
│   └── openai.ts          # OpenAI implementation (future)
├── prompts/
│   └── index.ts           # System prompts
└── aiService.ts           # Central service

app/api/
└── chat/
    └── route.ts           # API endpoint

app/assistant/
└── page.tsx               # Frontend UI
```

---

## 🔒 Security Considerations

1. **API Keys**
   - Always server-side only
   - Never expose to client
   - Environment variables only

2. **Input Validation**
   - Validate in API route
   - Check message format
   - Sanitize user input

3. **Rate Limiting**
   - Handle provider limits
   - Implement app-level limits
   - User-based throttling

4. **Error Handling**
   - Don't expose internal errors
   - Log errors server-side
   - Return user-friendly messages

---

## 🎯 Current State vs Future State

### Current (Development Phase)

```typescript
✅ Provider abstraction layer implemented
✅ Gemini provider functional
✅ Single provider mode
✅ API route secured
✅ Frontend connected
```

### Future (Production Phase)

```typescript
⏳ OpenAI provider added
⏳ Environment-based selection
⏳ Fallback logic
⏳ Usage tracking
⏳ Cost optimization
⏳ A/B testing support
```

---

## 📊 Performance Considerations

### Response Times

| Provider | Typical Response | Use Case |
|----------|-----------------|----------|
| Gemini 1.5 Flash | ~1-2s | General chat, fast responses |
| Gemini 1.5 Pro | ~2-4s | Complex analysis |
| GPT-4o mini | ~1-2s | General chat |
| GPT-4o | ~3-5s | Deep reasoning |

### Cost Comparison

| Provider | Cost per 1K tokens | Best For |
|----------|-------------------|----------|
| Gemini 1.5 Flash | ~$0.00 (free tier) | Development |
| GPT-4o mini | ~$0.0002 | Production chat |
| GPT-4o | ~$0.005 | Complex tasks |

---

## ✅ Summary

The StudyOS AI architecture is:

- ✅ **Modular** - Easy to add/remove providers
- ✅ **Scalable** - Supports multiple providers
- ✅ **Maintainable** - Clean separation of concerns
- ✅ **Flexible** - Easy configuration options
- ✅ **Secure** - Server-side API key management
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Production-Ready** - Error handling and validation

**Adding OpenAI will require ~50 lines of code. No frontend changes.**

---

## 🚀 Next Steps

1. ✅ Current: Using Gemini
2. ⏳ Test thoroughly with Gemini
3. ⏳ Add OpenAI provider when ready
4. ⏳ Implement provider selection logic
5. ⏳ Add fallback mechanisms
6. ⏳ Implement usage tracking

The foundation is solid. The future is flexible. 🎉
