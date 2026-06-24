/**
 * Gemini Verification Script
 * Run this to test Gemini integration without starting the full app
 * 
 * Usage: node verify-gemini.js
 * DELETE THIS FILE after verification
 */

require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function verifyGemini() {
  console.log('='.repeat(60));
  console.log('GEMINI INTEGRATION VERIFICATION');
  console.log('='.repeat(60));
  console.log('');

  // Step 1: Check environment variable
  console.log('[Step 1] Checking environment variable...');
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ FAILED: GEMINI_API_KEY not found');
    console.log('   Solution: Check .env.local file exists and has GEMINI_API_KEY');
    process.exit(1);
  }
  
  if (apiKey.includes('your_')) {
    console.log('❌ FAILED: GEMINI_API_KEY is still placeholder');
    console.log('   Solution: Replace with actual API key from https://aistudio.google.com/app/apikey');
    process.exit(1);
  }
  
  // Show key prefix without validation
  const keyPrefix = apiKey.substring(0, 15);
  console.log(`✅ PASSED: API key found (${keyPrefix}...)`);
  console.log(`   Key format: ${apiKey.startsWith('AIza') ? 'Standard (AIza)' : apiKey.startsWith('AQ.') ? 'Auth (AQ.)' : 'Unknown'}`);
  console.log('');

  // Step 2: Initialize Gemini
  console.log('[Step 2] Initializing Gemini client...');
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ PASSED: Gemini client initialized');
    console.log('');

    // Step 3: Test API connectivity with different models
    console.log('[Step 3] Testing Gemini API connectivity...');
    const modelsToTry = ['gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
    
    let success = false;
    for (const modelName of modelsToTry) {
      try {
        console.log(`   Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent('Say "Hello from Gemini!" in exactly those words.');
        const response = await result.response;
        const text = response.text();
        
        console.log(`   ✅ SUCCESS with ${modelName}`);
        console.log(`   Response: "${text.trim()}"`);
        console.log('');
        success = true;
        break;
      } catch (error) {
        console.log(`   ❌ ${modelName} failed: ${error.message.split('\n')[0]}`);
      }
    }

    if (!success) {
      throw new Error('All models failed. API key may be invalid or have no access.');
    }

    // Summary
    console.log('='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Next steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Visit: http://localhost:3000/api/test-env');
    console.log('3. Visit: http://localhost:3000/api/test-gemini');
    console.log('4. Test the AI Assistant at: http://localhost:3000/assistant');
    console.log('');

  } catch (error) {
    console.log('❌ FAILED: Gemini API error');
    console.log('   Error:', error.message);
    console.log('');
    console.log('Common issues:');
    console.log('- Invalid API key: Get new key from https://aistudio.google.com/app/apikey');
    console.log('- API not enabled: Enable Generative Language API in Google Cloud');
    console.log('- Rate limit: Wait a moment and try again');
    console.log('- Network issue: Check internet connection');
    console.log('');
    process.exit(1);
  }
}

// Run verification
verifyGemini().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
