/**
 * Gemini Model Discovery via REST API
 * 
 * Uses the Google Gemini REST API to list all available models.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'GEMINI_API_KEY not configured',
      }, { status: 500 });
    }

    console.log('\n=== GEMINI MODEL DISCOVERY (REST API) ===');
    
    // Use the REST API to list models
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    console.log('Fetching models from REST API...');
    const response = await fetch(listUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to list models:', response.status, errorText);
      return NextResponse.json({
        error: `Failed to list models: ${response.status}`,
        details: errorText,
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    console.log('Models retrieved:', data.models?.length || 0);
    
    // Filter models that support generateContent
    const generativeModels = data.models?.filter((model: any) => 
      model.supportedGenerationMethods?.includes('generateContent')
    ) || [];
    
    console.log('Generative models:', generativeModels.length);
    
    // Extract model names
    const modelNames = generativeModels.map((model: any) => ({
      name: model.name,
      displayName: model.displayName,
      description: model.description,
      inputTokenLimit: model.inputTokenLimit,
      outputTokenLimit: model.outputTokenLimit,
      supportedMethods: model.supportedGenerationMethods,
    }));
    
    console.log('\nAvailable generative models:');
    modelNames.forEach((m: any) => {
      console.log(`  - ${m.name} (${m.displayName})`);
    });
    
    console.log('\n=== DISCOVERY COMPLETE ===\n');
    
    return NextResponse.json({
      totalModels: data.models?.length || 0,
      generativeModels: modelNames,
      recommended: modelNames[0]?.name || null,
    });
    
  } catch (error: any) {
    console.error('\n=== DISCOVERY ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
