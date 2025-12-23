// app/api/simulate/route.js
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    // FIX 1: Frontend sends 'text', so we must destructure 'text' here.
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Input text required" }, { status: 400 });
    }

    const systemPrompt = `
      You are the Reality Distortion Engine. Your goal is to reframe a neutral fact into 5 specific psychological narratives: 
      1. Fear
      2. Optimism
      3. Authority
      4. Cynicism
      5. Politics (Focus on partisan blame, agendas, and ideological warfare).
      
      For EACH narrative, generate 3 intensity levels:
      - low: Subtle bias (adjective changes).
      - med: Clear emotional framing.
      - high: Extreme propaganda/alarmism.
      
      For the "high" version, also create a "diff" string using HTML <del> for removed words and <ins> for added words.
      Identify 2-3 single-word "triggers" in the high version (words that trigger emotion).

      OUTPUT MUST BE VALID JSON ONLY. NO MARKDOWN. Structure:
      {
        "fear": { 
          "low": {"text": "...", "triggers": []}, 
          "med": {"text": "...", "triggers": []}, 
          "high": {"text": "...", "triggers": []}, 
          "diff": "..." 
        },
        "optimism": { "low": {...}, "med": {...}, "high": {...}, "diff": "..." },
        "authority": { "low": {...}, "med": {...}, "high": {...}, "diff": "..." },
        "cynicism": { "low": {...}, "med": {...}, "high": {...}, "diff": "..." },
        "politics": { "low": {...}, "med": {...}, "high": {...}, "diff": "..." }
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Fact to distort: "${text}"` },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048, // Increased to ensure full JSON response
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(content);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json({ error: "Simulation Failed" }, { status: 500 });
  }
}