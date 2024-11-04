import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.0",
      messages: [
        {
          role: "system",
          content: "You are a comedian. Generate a random joke."
        },
        {
          role: "user",
          content: "Tell me a joke"
        }
      ],
    });

    return NextResponse.json({ joke: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
