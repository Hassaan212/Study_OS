/**
 * Gemini Verification Script (New SDK)
 * Tests with @google/genai package which supports AQ. authentication keys
 * 
 * Usage: node verify-gemini-new.js
 */

require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require('@google/genai');

async function verifyGemini() {
  console.log('='.repeat(60));
  console.log('GEMINI INTEGRATION VERIFICATION (New SDK)');
  console.log('='.repeat(60));
  console.log('');

  // Step 1: Check environment variable
  console.log('[Step 1] Checking environment variable...');
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ FAILED: GEMINI_API_KEY not found');
    process.exit(1);
  }
  
  if (apiKey.includes('your_')) {
    console.log('❌ FAILED: GEMINI_API_KEY is still placeholder');
    process.exit(1);
  }
  
  const keyPrefix = apiKey.substring(0, 15);
  console.log(`✅ PASSED: API key found (${keyPrefix}...)`);
  console.log(`   Key format: ${apiKey.startsWith('AIza') ? 'Standard (AIza)' : apiKey.startsWith('AQ.') ? 'Auth (AQ.)' : 'Unknown'}`);
  console.log('');

  // Step 2: Initialize Gemini with new SDK
  console.log('[Step 2] Initializing Gemini client (new SDK)...');
  try {
    const client = new GoogleGenAI({ apiKey });
    console.log('✅ PASSED: Gemini client initialized');
    console.log('');

    // Step 3: Test API connectivity
    console.log('[Step 3] Testing Gemini API connectivity...');
    console.log('   Sending test prompt...');
    
    const response = await client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Say "Hello from Gemini!" in exactly those words.',
    });
    
    console.log('   ✅ SUCCESS!');
    console.log(`   Response: "${response.text.trim()}"`);
    console.log('');

    // Summary
    console.log('='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log('');
    console.log('The new @google/genai SDK works with AQ. authentication keys!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Update provider code to use new SDK');
    console.log('2. Start development server: npm run dev');
    console.log('3. Test the AI Assistant at: http://localhost:3000/assistant');
    console.log('');

  } catch (error) {
    console.log('❌ FAILED: Gemini API error');
    console.log('   Error:', error.message);
    console.log('');
    
    if (error.response) {
      console.log('   Response:', error.response);
    }
    
    console.log('Common issues:');
    console.log('- API not enabled: Enable Generative Language API');
    console.log('- Rate limit: Wait and try again');
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
