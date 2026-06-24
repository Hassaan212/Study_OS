/**
 * List Available Gemini Models
 * DELETE THIS FILE after verification
 */

require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('Error: GEMINI_API_KEY not found');
    process.exit(1);
  }

  console.log('Fetching available models...\n');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models
    const models = await genAI.listModels();
    
    console.log('Available Models:');
    console.log('='.repeat(60));
    
    for await (const model of models) {
      console.log(`\nModel: ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported: ${model.supportedGenerationMethods?.join(', ')}`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nTrying simple model names...\n');
    
    // Try officially supported model names from Gemini API
    const modelsToTry = [
      'models/gemini-2.5-flash',
      'models/gemini-2.5-pro',
      'models/gemini-2.0-flash',
      'models/gemini-flash-latest',
      'models/gemini-pro-latest',
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing ${modelName}...`);
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Test');
        console.log(`  ✅ ${modelName} works!`);
        break;
      } catch (err) {
        console.log(`  ❌ ${modelName} failed:`, err.message.split('\n')[0]);
      }
    }
  }
}

listModels();
