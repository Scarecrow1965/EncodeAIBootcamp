// import { openai } from "@ai-sdk/openai";
// import { convertToCoreMessages, streamText } from "ai";
// 
// export async function POST(req: Request) {
//   const { messages } = await req.json();
// 
//   const result = await streamText({
//     model: openai("gpt-4o"),
//     messages: convertToCoreMessages(messages),
//   });
// 
//   return result.toDataStreamResponse();
// }

// Story-telling model
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

// Scarecrow1965's version
import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI();
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

export const runtime = "edge";

export async function POST(req: Request) {
  const { topic, tone, type, temperature } = await req.json();

    // Build prompts for joke generation and evaluation
    const jokePrompt = `Please tell me a ${tone} ${type} joke about ${topic} with a creativity level of ${temperature}.`;
    const evaluationPrompt = `Evaluate the following joke and classify it as one of the following: Funny, Appropriate, Offensive, Creative, Original.\n\nJoke: ${jokePrompt}\n\nEvaluation:`;

    try {
        console.log("Generating joke with prompt:", jokePrompt);
    
        // Joke generation request
        const jokeResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: parseFloat(temperature),  // Ensure temperature is a float
            messages: [
                { role: "system", content: "You are a stand-up comedian, entertaining users with your wit and humor. Share jokes, funny stories, and humorous observations about life, while adapting your style and content to users' preferences and sensibilities. Encourage laughter and lightheartedness while maintaining a respectful and inclusive tone." },
                { role: "user", content: jokePrompt },
            ],
        });

        const joke = jokeResponse.choices[0].message?.content?.trim()
        console.log("Generated joke:", joke);

        // Joke evaluation request
        console.log("Evaluating joke with prompt:", evaluationPrompt);
        const evaluationResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an excellent evaluator of jokes." },
                { role: "user", content: `${evaluationPrompt} ${joke}` },
            ],
        });

        const evaluation = evaluationResponse.choices[0]?.message?.content?.trim();
        console.log("Evaluation:", evaluation);

        // Return the joke and evaluation as a JSON response
        return new Response(JSON.stringify({ joke, evaluation: evaluation?.replace(/^Evaluation: \s*/, '') }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
          
    } catch (error) {
        console.error("Error generating joke or evaluation:", error);
        return new Response(JSON.stringify({ error: "Failed to generate joke or evaluation" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// MLittle's version
// import OpenAI from 'openai';
// import { NextResponse } from 'next/server';
// 
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// 
// export async function POST(request: Request) {
//   try {
//     const { topic, tone, type, temperature } = await request.json();
// 
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       temperature: temperature || 0.7,
//       messages: [
//         {
//           role: "system",
//           content: "You are a comedy writer specializing in different styles of jokes. Create jokes based on these criteria:",
//           "Dad Jokes:",
//           "- Clean and family-friendly",
//           "- Heavy use of puns or word play",
//           "- Should make people groan and smile",
//           "- Obvious or predictable punchlines",
//           "Sarcastic Jokes:",
//           "- Use irony to mock or criticize",
//           "- Say the opposite of what is meant",
//           "- Employ dry wit or deadpan delivery",
//           "- Include subtle social commentary",
//           "Dark Humor:",
//           "- Address taboo or serious subjects",
//           "- Make light of traditionally sensitive topics",
//           "- Balance discomfort with amusement",
//           "- Use gallows humor appropriately",
//           "Generate a single ${tone} ${type} joke about ${topic}. Only return the joke text with no additional explanation or commentary.",
//         },
//         {
//           role: "user",
//           content: "Create a ${tone} ${type} joke about ${topic}. Remember to only return the joke text.",
//         }
//       ],
//       max_tokens: 200,
//     });
// 
//     return NextResponse.json({ joke: response.choices[0].message.content });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(
//       { error: 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }