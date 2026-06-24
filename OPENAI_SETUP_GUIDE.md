# Quick Start: OpenAI Setup for AI Assistant

## 🚀 Get Started in 3 Steps

### Step 1: Get Your OpenAI API Key

1. Visit **https://platform.openai.com/**
2. Sign up or log in
3. Go to **https://platform.openai.com/api-keys**
4. Click "**Create new secret key**"
5. Name it (e.g., "StudyOS Development")
6. **Copy the key** (you can only see it once!)

### Step 2: Add API Key to Your Project

1. Open the file: **`.env.local`** in your project root
2. Add this line at the bottom:
   ```env
   OPENAI_API_KEY=sk-proj-your_actual_key_here
   ```
3. Replace `sk-proj-your_actual_key_here` with your real key
4. Save the file

### Step 3: Restart Your Server

```bash
# Stop your development server (Ctrl+C in terminal)
# Then restart it:
npm run dev
```

## ✅ That's It!

Your AI Assistant is now ready to use!

1. Navigate to **http://localhost:3000/assistant**
2. Log in if needed
3. Start chatting with your AI study assistant!

## 🧪 Test It

Try these example prompts:
- "Explain what photosynthesis is in simple terms"
- "Summarize the main causes of World War 2"
- "Generate 5 MCQs on the Pythagorean theorem"
- "Create flashcards for key terms in cellular biology"

## 💰 Costs

OpenAI GPT-4o mini is very affordable:
- **~$0.003-0.006** per conversation (10 messages)
- Most students spend less than **$2/month**
- You can set spending limits in OpenAI dashboard

## ⚠️ Important Security Notes

- ✅ Your API key is stored in `.env.local`
- ✅ This file is in `.gitignore` (not committed to Git)
- ✅ The key is only used on the server (not exposed to browser)
- ❌ Never commit your API key to version control
- ❌ Never share your API key publicly

## 🐛 Troubleshooting

### "OpenAI API key is not configured"
- Check that `.env.local` has `OPENAI_API_KEY=sk-proj-...`
- Restart your development server
- Make sure there are no extra spaces around the `=` sign

### "Invalid OpenAI API key"
- Verify you copied the full key (starts with `sk-proj-` or `sk-`)
- Generate a new key on OpenAI platform
- Make sure the key is active (not revoked)

### Chat not responding
- Check your internet connection
- Verify you have OpenAI credits/quota remaining
- Open browser DevTools (F12) → Console tab for errors

### Need more help?
See the full documentation in **`AI_ASSISTANT_IMPLEMENTATION.md`**

## 📊 Monitor Your Usage

- Dashboard: **https://platform.openai.com/usage**
- Set spending limits: **https://platform.openai.com/account/limits**
- Get email alerts when reaching usage thresholds

## 🎉 You're All Set!

Your AI Study Assistant is ready to help with:
- 🎓 Explaining complex topics
- 📄 Summarizing notes
- ❓ Generating practice questions
- 🃏 Creating flashcards
- 🧮 Solving problems
- 📅 Creating study plans

Happy studying! 📚✨
