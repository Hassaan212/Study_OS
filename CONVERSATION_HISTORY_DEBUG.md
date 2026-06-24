# Conversation History Debugging Guide

## Comprehensive Logging Added

I've added extensive logging to track the exact payloads and conversions at every step of the multi-turn conversation flow.

---

## 🔍 LOGGING LOCATIONS

### 1. API Route (`app/api/chat/route.ts`)
```
=== API ROUTE DEBUG ===
Received messages count: X
Full messages payload: [...]
Calling aiService.chat() with X messages
Response received from aiService
=== END API ROUTE DEBUG ===
```

### 2. Message Conversion (`lib/ai/providers/gemini.ts`)
```
=== MESSAGE CONVERSION DEBUG ===
Input messages count: X
System prompt provided: true/false
Converting message 0: role="...", content length=...
  -> Mapped role "assistant" to "model"
Final history count: X
=== END CONVERSION DEBUG ===
```

### 3. Gemini Request (`lib/ai/providers/gemini.ts`)
```
=== GEMINI REQUEST DEBUG (START) ===
Total messages received: X
Messages array: [full JSON]
Converted history length: X
Full Gemini history: [full JSON]
Message 0: role="user", parts count=1, text length=...
Message 1: role="model", parts count=1, text length=...
History for chat.startChat(): X messages
Last message to send separately: {...}
Sending message with role: user
Message content: ...
=== GEMINI RESPONSE DEBUG ===
[response details]
=== END DEBUG ===
```

### 4. Error Logging (if second request fails)
```
=== GEMINI ERROR DEBUG ===
Error type: ...
Error message: ...
Error status: ...
Error details: [full JSON]
Full error object: ...
=== END ERROR DEBUG ===
```

---

## 🧪 TESTING STEPS

### Step 1: Start the dev server
```bash
npm run dev
```

### Step 2: Open browser console AND server terminal

### Step 3: Test First Prompt
1. Open AI Assistant page
2. Send: "Hello"
3. **In SERVER CONSOLE**, look for:

```
=== API ROUTE DEBUG ===
Received messages count: 1
Full messages payload: [
  {
    "role": "user",
    "content": "Hello"
  }
]
```

Then:
```
=== MESSAGE CONVERSION DEBUG ===
Input messages count: 1
System prompt provided: true
Converting message 0: role="user", content length=5
  -> Mapped role "user" to "user"
Final history count: 3  (system + ack + user message)
```

Then:
```
=== GEMINI REQUEST DEBUG (START) ===
Total messages received: 1
Converted history length: 3
Message 0: role="user", parts count=1, text length=... (system prompt)
Message 1: role="model", parts count=1, text length=... (ack)
Message 2: role="user", parts count=1, text length=5
History for chat.startChat(): 2 messages (system pair)
Last message to send separately: {"role":"user","parts":[{"text":"Hello"}]}
```

**✅ First request should succeed**

### Step 4: Test Second Prompt
1. Send: "What is JavaScript?"
2. **In SERVER CONSOLE**, look for:

```
=== API ROUTE DEBUG ===
Received messages count: 3  ← Should be 3 (user + assistant + user)
Full messages payload: [
  {
    "role": "user",
    "content": "Hello"
  },
  {
    "role": "assistant",  ← Check this role!
    "content": "..."
  },
  {
    "role": "user",
    "content": "What is JavaScript?"
  }
]
```

Then check conversion:
```
=== MESSAGE CONVERSION DEBUG ===
Input messages count: 3
Converting message 0: role="user", content length=...
  -> Mapped role "user" to "user"
Converting message 1: role="assistant", content length=...
  -> Mapped role "assistant" to "model"  ← This mapping is critical
Converting message 2: role="user", content length=...
  -> Mapped role "user" to "user"
Final history count: 5  (system + ack + user + model + user)
```

Then check Gemini request:
```
=== GEMINI REQUEST DEBUG (START) ===
Total messages received: 3
Converted history length: 5
Message 0: role="user" ✓
Message 1: role="model" ✓
Message 2: role="user" ✓
Message 3: role="model" ✓  ← Previous AI response
Message 4: role="user" ✓   ← New user message
History for chat.startChat(): 4 messages
Last message to send separately: {"role":"user","parts":[...]}
```

**If second request FAILS**, look for:
```
=== GEMINI ERROR DEBUG ===
Error message: ...
```

---

## 🚨 WHAT TO LOOK FOR

### Problem 1: Invalid Role in History
**Symptom**:
```
❌ INVALID ROLE at index X: assistant
```

**Cause**: Message role wasn't converted from "assistant" to "model"

**Fix**: Check `convertMessagesToGeminiFormat()` is being called

---

### Problem 2: Empty Messages
**Symptom**:
```
Message X: role="...", parts count=0, text length=0
❌ INVALID PARTS at index X
```

**Cause**: Message has no content

**Fix**: Filter out empty messages before sending

---

### Problem 3: Alternating Role Violation
**Symptom**:
```
Error message: Please ensure that multiturn requests alternate between user and model.
```

**Cause**: Gemini requires strict user → model → user → model pattern

**Example of BAD history**:
```
user → model → user → user  ❌ Two user messages in a row
```

**Example of GOOD history**:
```
user → model → user → model → user ✓
```

---

### Problem 4: Duplicate Messages
**Symptom**:
```
Converted history length: 7
(but should be 5)
```

**Cause**: Last message being included in both history and sendMessage()

**Current Implementation**:
```typescript
history: history.slice(0, -1),  // All except last ✓
chat.sendMessage(lastMessage)   // Send last separately ✓
```

This is correct. If you see duplicates, check frontend.

---

### Problem 5: System Message in Wrong Place
**Symptom**:
```
Message 3: role="system", ...
```

**Cause**: System messages should be filtered out after initial setup

**Fix**: The conversion function skips system messages ✓

---

## 📊 EXPECTED OUTPUT

### First Request (1 message)
```
API: 1 message received
Conversion: 3 in history (system + ack + user)
Gemini: 2 in history, 1 sent separately
Result: ✅ Success
```

### Second Request (3 messages)
```
API: 3 messages received (user + assistant + user)
Conversion: 5 in history (system + ack + user + model + user)
Gemini: 4 in history, 1 sent separately
Result: ✅ Should succeed
```

### Third Request (5 messages)
```
API: 5 messages received
Conversion: 7 in history (system + ack + 5 messages)
Gemini: 6 in history, 1 sent separately
Result: ✅ Should succeed
```

---

## 🔧 COMMON ISSUES & FIXES

### Issue: "assistant" role not being converted
**Check**: `convertMessagesToGeminiFormat()` line:
```typescript
role: message.role === 'assistant' ? 'model' : 'user',
```

### Issue: History includes the current message twice
**Check**: `startChat` receives `history.slice(0, -1)` not full history

### Issue: Non-alternating roles
**Check**: Frontend sending messages in correct order

### Issue: Empty content
**Check**: Frontend validation before sending

---

## 📝 NEXT STEPS

1. **Run the application**
2. **Open server terminal** to see logs
3. **Send first message** - should succeed
4. **Send second message** - check logs
5. **Copy the ENTIRE log output** for first and second requests
6. **Compare the payloads** to identify the difference
7. **Look for the specific error message** in GEMINI ERROR DEBUG section

---

## 🎯 WHAT WE'RE LOOKING FOR

The logs will tell us:

1. ✓ What roles are being sent from frontend
2. ✓ How roles are being converted
3. ✓ What the exact Gemini history looks like
4. ✓ Whether messages are being duplicated
5. ✓ Whether roles are alternating correctly
6. ✓ The exact error message from Gemini

**After you test, share the server console logs for both the first and second request, and we'll identify the exact problem.**
