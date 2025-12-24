import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("CRITICAL: GROQ_API_KEY is missing from environment variables.");
}

const groq = new Groq({ apiKey: GROQ_API_KEY || "dummy_key" });

const PROMPTS = {
  distort: `
    You are the Reality Distortion Engine. Your goal is to reframe a neutral fact into 5 specific psychological narratives: 
    1. Fear
    2. Optimism
    3. Authority
    4. Cynicism
    5. Politics (Focus on partisan blame, agendas, and ideological warfare).
    
    For EACH narrative, generate 3 intensity levels:
    - low: Subtle bias.
    - med: Clear emotional framing.
    - high: Extreme propaganda.
    
    For the "high" version, also create a "diff" string using HTML <del> and <ins>.
    Identify 2-3 single-word "triggers".

    OUTPUT JSON STRUCTURE:
    {
      "fear": { "low": {"text": "...", "triggers": []}, "med": {...}, "high": {...}, "diff": "..." },
      "optimism": { ... },
      "authority": { ... },
      "cynicism": { ... },
      "politics": { ... }
    }
  `,
  neutralize: `
    You are the De-Programmer. Your goal is to strip away emotional language and EXPOSE the manipulation tactics used in the input.
    
    1. Rewrite the input as a flat, boring, objective fact.
    2. Identify the specific "Manipulative Terms" used.
    3. PERFORM A TACTICAL AUTOPSY: Explain exactly how this text manipulates the reader. 
       - Focus on how it "markets" to followers (identity confirmation).
       - Focus on how it uses "horror" or fear to create mental chaos/urgency.
    
    OUTPUT JSON STRUCTURE:
    {
      "neutral_version": "The boring factual statement.",
      "removed_terms": ["term1", "term2"],
      "tactical_analysis": {
         "follower_marketing": "How this text signals in-group identity or validates a specific worldview.",
         "chaos_mechanics": "How the text uses fear/horror to bypass logic and induce panic."
      }
    }
  `
};

export async function POST(req) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "Server Configuration Error: API Key missing." }, { status: 500 });
    }

    const body = await req.json();
    const { text, mode = 'distort' } = body; 

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Input text required." }, { status: 400 });
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: "Input text exceeds 1000 character limit." }, { status: 400 });
    }

    const systemPrompt = mode === 'neutralize' ? PROMPTS.neutralize : PROMPTS.distort;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Input text: "${text}"` },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from LLM");
    }

    let data;
    try {
      data = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json({ error: "Failed to parse simulation reality." }, { status: 502 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Simulation API Error:", error);
    return NextResponse.json({ error: "Internal Simulation Error" }, { status: 500 });
  }
}