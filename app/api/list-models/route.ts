/**
 * Gemini Model Discovery Route
 * 
 * This route discovers all available Gemini models supported by the current API key.
 * Use this to find the correct model names before updating the provider.
 */

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'GEMINI_API_KEY not configured',
      }, { status: 500 });
    }

    console.log('\n=== GEMINI MODEL DISCOVERY ===');
    console.log('API Key present:', !!apiKey);
    console.log('API Key prefix:', apiKey.substring(0, 10) + '...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models using the SDK
    console.log('\nAttempting to list models...');
    
    let models: any[] = [];
    let listError = null;
    
    try {
      // The SDK might have a listModels method
      if ('listModels' in genAI) {
        console.log('Found listModels method in SDK');
        const response = await (genAI as any).listModels();
        models = response;
        console.log('Models retrieved:', models.length);
      } else {
        console.log('No listModels method found in SDK');
      }
    } catch (error: any) {
      listError = error.message;
      console.error('Error listing models:', error.message);
    }

    // Try common model names to see which work
    console.log('\nTesting common model names...');
    const modelsToTest = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro-latest',
      'gemini-1.5-flash-latest',
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash-002',
      'gemini-1.5-pro-002',
      'models/gemini-pro',
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
    ];

    const testResults = [];
    
    for (const modelName of modelsToTest) {
      try {
        console.log(`\nTesting model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Try a simple generation
        const result = await model.generateContent('Say "test" in one word');
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ ${modelName} - SUCCESS`);
        console.log(`   Response: ${text.substring(0, 50)}`);
        
        testResults.push({
          model: modelName,
          status: 'SUCCESS',
          response: text.substring(0, 100),
        });
      } catch (error: any) {
        console.log(`❌ ${modelName} - FAILED`);
        console.log(`   Error: ${error.message}`);
        console.log(`   Status: ${error.status || 'N/A'}`);
        
        testResults.push({
          model: modelName,
          status: 'FAILED',
          error: error.message,
          statusCode: error.status || null,
        });
      }
    }

    console.log('\n=== MODEL DISCOVERY COMPLETE ===\n');

    return NextResponse.json({
      sdkVersion: '^0.24.1',
      apiKeyPresent: true,
      listModelsSupported: 'listModels' in genAI,
      availableModels: models,
      testResults,
      recommendation: testResults.find(r => r.status === 'SUCCESS')?.model || 'No working model found',
    });

  } catch (error: any) {
    console.error('\n=== MODEL DISCOVERY ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
