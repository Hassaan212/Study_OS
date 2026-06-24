# Raw Gemini Error Debugging

## All Error Masking Removed

All custom error messages have been removed. The code now returns and logs the EXACT Gemini API error.

---

## 🔍 WHAT YOU'LL SEE NOW

### Before Gemini API Call:
```
=== GEMINI PAYLOAD (BEFORE API CALL) ===
Role sequence: user -> model -> user -> model -> (sending) -> user
Message count in history: 4
Complete request payload:
  history: [full JSON array]
  current message: {full JSON object}
==================================
```

### After Gemini Responds (Success):
```
=== GEMINI RESPONSE (RAW) ===
Raw result object: [full response]
==================================
```

### When Gemini Fails (Error):
```
=== GEMINI ERROR - RAW ===
Full error object: [complete error]
error.message: [exact error message]
error.status: [HTTP status code]
error.statusText: [status text]
error.code: [error code if present]
error.details: [error details if present]
error.name: [error name]
error.response: [response body if present]
error.errorDetails: [additional details if present]
JSON.stringify(error): [complete JSON]
JSON with property names: [all properties]
=== END RAW ERROR ===
```

### API Route Error (if any):
```
=== API ROUTE ERROR (RAW) ===
Full error: [complete error]
error.message: [exact message]
error.stack: [stack trace]
JSON.stringify: [full JSON]
=== END API ROUTE ERROR ===
```

---

## 📱 WHAT YOU'LL SEE IN THE UI

Instead of:
```
"Gemini service temporarily unavailable. This often indicates a formatting issue..."
```

You'll now see the **ACTUAL Gemini error message**:
```
[Real Gemini API error here]
```

---

## 🧪 TESTING STEPS

1. **Restart the dev server** (important!)
   ```bash
   npm run dev
   ```

2. **Open the browser console** (F12) and **server terminal** side by side

3. **Send first message**: "Hello"
   - Should work ✅
   - Check server logs for successful response

4. **Send second message**: "What is JavaScript?"
   - Watch server console carefully
   - You will see:

### In Server Console:
```
=== API ROUTE DEBUG ===
Received messages count: 3

=== MESSAGE CONVERSION DEBUG ===
Converting message 0: role="user"
Converting message 1: role="assistant"
  -> Mapped role "assistant" to "model"
Converting message 2: role="user"
Role sequence: user -> model -> user -> model -> user

=== GEMINI PAYLOAD (BEFORE API CALL) ===
[Full payload before sending to Gemini]

=== SENDING TO GEMINI ===

=== GEMINI ERROR - RAW ===
[THE REAL ERROR WILL BE HERE]
error.message: [This is what we need to see!]
```

### In Browser Console/UI:
The **exact error message** from Gemini will be displayed

---

## 🎯 WHAT WE'RE LOOKING FOR

The real error message will tell us exactly what's wrong:

### Possible Real Errors:

**If it says "USER_TURN"**:
```
Error: Please ensure that multiturn requests alternate between user and model.
```
→ Means: History has consecutive same-role messages

**If it says "INVALID_ARGUMENT"**:
```
Error: Invalid argument provided
```
→ Means: Message format is incorrect

**If it says something about "parts"**:
```
Error: Parts must contain text
```
→ Means: Empty or malformed message content

**If it says something about "role"**:
```
Error: Invalid role
```
→ Means: Using "assistant" instead of "model"

**Any other error**:
→ Will be the exact Gemini API error explaining what's wrong

---

## 📊 EXPECTED OUTPUT

### Server Console for Second Request:
```
=== API ROUTE DEBUG ===
Received messages count: 3
Full messages payload: [
  {"role":"user","content":"Hello"},
  {"role":"assistant","content":"[AI response]"},
  {"role":"user","content":"What is JavaScript?"}
]

=== MESSAGE CONVERSION DEBUG ===
Input messages count: 3
System prompt provided: true
Adding system prompt exchange to history
Converting message 0: role="user", content length=5
  -> Mapped role "user" to "user"
Converting message 1: role="assistant", content length=50
  -> Mapped role "assistant" to "model"
Converting message 2: role="user", content length=19
  -> Mapped role "user" to "user"
Final history count: 5
Role sequence: user -> model -> user -> model -> user

=== VALIDATING HISTORY ===
Message 0: role="user", parts count=1, text length=X
Message 1: role="model", parts count=1, text length=X
Message 2: role="user", parts count=1, text length=5
Message 3: role="model", parts count=1, text length=50
Message 4: role="user", parts count=1, text length=19

=== CHAT INITIALIZATION ===
Conversation history length: 4
Current message to send: {"role":"user","parts":[{"text":"What is JavaScript?"}]}
Last message in history: role="model"
Current message: role="user"

=== GEMINI PAYLOAD (BEFORE API CALL) ===
Role sequence: user -> model -> user -> model -> (sending) -> user
Message count in history: 4
Complete request payload:
  history: [
    {"role":"user","parts":[{"text":"[system prompt]"}]},
    {"role":"model","parts":[{"text":"Understood..."}]},
    {"role":"user","parts":[{"text":"Hello"}]},
    {"role":"model","parts":[{"text":"[first AI response]"}]}
  ]
  current message: {"role":"user","parts":[{"text":"What is JavaScript?"}]}
==================================

=== SENDING TO GEMINI ===

[IF ERROR OCCURS, YOU'LL SEE:]

=== GEMINI ERROR - RAW ===
Full error object: [complete error]
error.message: [THE EXACT ERROR MESSAGE FROM GEMINI API]
[All other error properties]
=== END RAW ERROR ===
```

---

## 🔍 HOW TO FIND THE ROOT CAUSE

1. Look at the **error.message** in the raw error output
2. Look at the **role sequence** in the payload
3. Look at the **complete request payload** to see what was sent
4. Compare the payload structure to Gemini's requirements

The error message will explicitly tell you what's wrong.

---

## ✅ CHANGES MADE

### File: `lib/ai/providers/gemini.ts`

**Removed**:
- All custom error message replacements
- Error masking logic
- Generic error messages

**Added**:
- Complete error logging (all properties)
- Pre-request payload logging
- Post-response raw logging
- Return actual error.message to frontend

### File: `app/api/chat/route.ts`

**Removed**:
- Generic "Failed to process AI request" message

**Added**:
- Complete error logging
- Return real error message, details, and stack to frontend

---

## 🚀 NEXT STEPS

1. **Restart dev server** (MUST DO - code changes need to reload)
2. **Test first message** - verify it works
3. **Test second message** - capture the REAL error
4. **Copy the exact error message** from server console
5. **Share the error.message value** - this will tell us exactly what's wrong

The real Gemini error will point directly to the issue!
