// Original from Lesson 8, 04-Story-Telling.md
// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// 
// const openai = new OpenAI();
// 
// export const runtime = "edge";
// 
// export async function POST(req: Request) {
//   const { messages } = await req.json();
// 
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     stream: true,
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
//       },
//       ...messages,
//     ],
//   });
// 
//   const stream = OpenAIStream(response);
//   return new StreamingTextResponse(stream);
// }

//  from Lesson 12, 04-Story-Telling.md
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// const openai = new OpenAI(); // this works to deliver an output on screen

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
  baseURL: `http://127.0.0.1:5000/v1`,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Ensure `messages` is formatted correctly
    if (!Array.isArray(messages) || !messages.length) {
        throw new Error("Invalid or empty messages array");
      }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a professional storyteller who has been hired to write a series of short stories.
           The stories should be captivating, imaginative, and thought-provoking.
           They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance.
           Each story should be unique and memorable, with compelling characters and unexpected plot twists.
           Keep the paragraphs short and sweet, and the stories engaging.
           Do not use the same words within the description and personality of each character.
           Additionally, provide a summary of each character's role after the story is generated.`,
        },
        ...messages,
      ],
    });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
} catch (error) {
  console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
