import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { joke } = await request.json();
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a joke evaluator. Evaluate if the joke is 'funny', 'appropriate', 'offensive', or a 'dad joke'. Provide a brief explanation why."
        },
        {
          role: "user",
          content: `Evaluate this joke: ${joke}`
        }
      ],
    });

    return NextResponse.json({ evaluation: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
