// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     stream: true,
//     messages,
//   });

//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}