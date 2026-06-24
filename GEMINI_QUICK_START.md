# 🚀 Gemini Quick Start Guide

## Get Your AI Assistant Running in 3 Steps!

---

## Step 1: Get Gemini API Key

1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

---

## Step 2: Add API Key

1. Open `.env.local` in your project root
2. Find the line: `GEMINI_API_KEY=your_gemini_api_key_here`
3. Replace with your actual key: `GEMINI_API_KEY=AIzaSy...`
4. Save the file

---

## Step 3: Restart Server

```bash
# Stop your development server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ That's It!

Your AI Assistant is ready!

1. Navigate to **http://localhost:3000/assistant**
2. Log in if needed
3. Start chatting!

---

## 🧪 Test It

Try these prompts:
- "Explain what photosynthesis is"
- "Generate 5 MCQs on World War 2"
- "Create flashcards for key terms in algebra"

Or click any **Quick Action card** to get started!

---

## 💰 Cost

Gemini is **FREE** for development:
- Free tier: 15 requests/minute
- 1 million tokens/minute
- Perfect for testing!

Paid tier is very affordable if you need more.

---

## 🐛 Issues?

### "API key not configured"
→ Check `.env.local` has your key
→ Restart server

### "Invalid API key"
→ Verify you copied the full key
→ Check it's active on AI Studio

### Chat not working
→ Open DevTools (F12) → Console
→ Check for errors

---

## 📚 Need More Info?

See `GEMINI_INTEGRATION_GUIDE.md` for complete documentation.

---

**Ready to learn with AI!** 🎓✨
