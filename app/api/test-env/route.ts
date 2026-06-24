/**
 * Environment Variable Test Route
 * Simple check to verify .env.local is being read
 * DELETE THIS FILE after verification
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY;
  
  return NextResponse.json({
    envLoaded: typeof geminiKey !== 'undefined',
    keyPresent: !!geminiKey && geminiKey.length > 0,
    keyPrefix: geminiKey ? geminiKey.substring(0, 10) : 'NOT_FOUND',
    keyLength: geminiKey?.length || 0,
    isPlaceholder: geminiKey?.includes('your_') || false,
    message: geminiKey 
      ? 'Environment variable loaded successfully' 
      : 'Environment variable NOT found - server restart may be required',
  });
}
