import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  const { input, intensity, isChaosMode } = await request.json();

  try {
    // 1. CONFIGURE FOR JSON MODE
    // 'responseMimeType: "application/json"' forces valid JSON output.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: isChaosMode ? 0.9 : 0.5, // Lower temp = better syntax
        responseMimeType: "application/json",  // <--- THE FIX
      }
    });

    const prompt = `
      System: Reality Distortion Engine.
      Input: "${input}"
      
      Instructions:
      1. Extract neutral fact.
      2. Generate 5 distorted variations.
      3. CRITICAL: Max 15 words per string. No quotes inside strings unless escaped.

      Distortion Settings:
      - Intensity: ${intensity}% 
      - Chaos: ${isChaosMode}

      Output JSON Structure:
      {
        "neutral": { "content": "String", "bias": "Objectivity" },
        "distortions": [
          { "type": "Fear", "content": "String", "cognitiveBias": "Catastrophizing", "intensity": "High" },
          { "type": "Optimistic", "content": "String", "cognitiveBias": "Optimism Bias", "intensity": "Medium" },
          { "type": "Corporate", "content": "String", "cognitiveBias": "Framing", "intensity": "High" },
          { "type": "Political", "content": "String", "cognitiveBias": "Ingroup Bias", "intensity": "High" },
          { "type": "Cynical", "content": "String", "cognitiveBias": "Hostile Attribution", "intensity": "Medium" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 2. PARSE WITH SAFETY
    // Since we forced JSON mode, text should be valid, but we still handle errors.
    let data;
    try {
        data = JSON.parse(text);
    } catch (parseError) {
        // If JSON mode fails (rare), try to sanitize markdown wraps
        const cleanText = text.replace(/```json|```/g, '').trim();
        data = JSON.parse(cleanText);
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Gemini 2.5 Error:", error.message);
    
    // 3. FAILSAFE (Simulation Mode)
    // Instant fallback if API is overloaded or quota exceeded
    return NextResponse.json({
      neutral: { content: `Report: ${input}`, bias: "Objectivity" },
      distortions: [
        { type: "Fear", content: `DANGER: ${input} signals collapse!`, cognitiveBias: "Panic", intensity: "High" },
        { type: "Optimistic", content: `Why ${input} is a miracle.`, cognitiveBias: "Delusion", intensity: "Medium" },
        { type: "Corporate", content: `Synergizing ${input} paradigms.`, cognitiveBias: "Spin", intensity: "Low" },
        { type: "Political", content: `The opposition hates ${input}.`, cognitiveBias: "Division", intensity: "High" },
        { type: "Cynical", content: `${input}? It's all rigged.`, cognitiveBias: "Apathy", intensity: "Medium" }
      ]
    });
  }
}