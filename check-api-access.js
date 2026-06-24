/**
 * Check API Access and Available Models
 */

require('dotenv').config({ path: '.env.local' });

async function checkAccess() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('Checking Gemini API Access...\n');
  console.log(`API Key: ${apiKey.substring(0, 15)}...`);
  console.log(`Format: ${apiKey.startsWith('AQ.') ? 'Auth Key (AQ.)' : 'Standard (AIza)'}\n`);
  
  // Try direct REST API call to list models
  try {
    console.log('Attempting to list available models via REST API...\n');
    
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log('❌ Error Response:');
      console.log(JSON.stringify(data, null, 2));
      console.log('\nPossible issues:');
      console.log('1. API not enabled for this key');
      console.log('2. Key does not have required permissions');
      console.log('3. Need to enable Generative Language API in Google Cloud');
      console.log('\nTo fix:');
      console.log('- Visit: https://console.cloud.google.com/');
      console.log('- Enable "Generative Language API"');
      console.log('- Or get a new key from: https://aistudio.google.com/app/apikey');
      return;
    }
    
    console.log('✅ API Access confirmed!');
    console.log('\nAvailable Models:');
    console.log('='.repeat(60));
    
    if (data.models) {
      data.models.forEach(model => {
        console.log(`\n📦 ${model.name}`);
        console.log(`   Display Name: ${model.displayName || 'N/A'}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Supports: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } else {
      console.log('No models found or unexpected response format');
      console.log(JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.log('❌ Network Error:', error.message);
    console.log('\nCheck:');
    console.log('- Internet connection');
    console.log('- Firewall settings');
    console.log('- Proxy configuration');
  }
}

checkAccess();
