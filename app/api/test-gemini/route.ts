/**
 * Gemini Test Route
 * 
 * This route tests:
 * 1. Environment variable loading
 * 2. Gemini API connectivity
 * 3. Basic AI response generation
 * 
 * DELETE THIS FILE after verification is complete.
 */

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  const results = {
    step1_envCheck: false,
    step2_apiKeyPresent: false,
    step3_geminiInit: false,
    step4_aiResponse: false,
    apiKey: '',
    error: null as string | null,
    response: null as string | null,
    errorStack: null as string | null,
  };

  try {
    // Step 1: Check if environment variables are loaded
    results.step1_envCheck = typeof process.env.GEMINI_API_KEY !== 'undefined';

    // Step 2: Check if API key is present and not placeholder
    const apiKey = process.env.GEMINI_API_KEY || '';
    results.apiKey = apiKey ? `${apiKey.substring(0, 15)}...` : 'NOT SET';
    results.step2_apiKeyPresent = apiKey.length > 0 && !apiKey.includes('your_');

    if (!results.step2_apiKeyPresent) {
      throw new Error('GEMINI_API_KEY not configured or is placeholder value');
    }

    // Step 3: Initialize Gemini and try multiple models
    const genAI = new GoogleGenerativeAI(apiKey);
    results.step3_geminiInit = true;

    // Step 4: Test API response with officially supported models from API
    const modelsToTry = ['models/gemini-2.5-flash', 'models/gemini-2.5-pro', 'models/gemini-2.0-flash'];
    let testSuccess = false;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = 'Say "Hello from Gemini!" in exactly those words.';
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        results.step4_aiResponse = true;
        results.response = text;
        testSuccess = true;
        break;
      } catch (error: any) {
        lastError = error;
        // Try next model
      }
    }

    if (!testSuccess && lastError) {
      throw lastError;
    }

    return NextResponse.json({
      success: true,
      message: 'Gemini integration verified successfully!',
      details: results,
    });

  } catch (error: any) {
    results.error = error.message || 'Unknown error';
    results.errorStack = error.stack || null;

    console.error('Gemini test error:', error);

    return NextResponse.json({
      success: false,
      message: 'Gemini integration test failed',
      details: results,
      error: error.message,
      fullError: error.toString(),
    }, { status: 500 });
  }
}
