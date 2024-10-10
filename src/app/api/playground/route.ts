// src/app/api/playground/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { input, mode } = await req.json();

  // Simulate processing the input based on the selected mode
  const response = `API received: ${input} in ${mode} mode`;

  return NextResponse.json({ response });
}
