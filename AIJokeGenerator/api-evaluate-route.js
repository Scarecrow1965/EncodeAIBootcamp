// MLittle's version
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { joke, topic, tone, type } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a joke evaluator. You are evaluating a ${tone} ${type} joke about ${topic}. Consider the intended tone and type when evaluating. For example, dark humor is meant to be provocative, dad jokes are meant to be groan-worthy, etc. Evaluate if the joke successfully achieves its intended style and explain why.",
        },
        {
          role: "user",
          content: "Evaluate this ${tone} ${type} joke about ${topic}: ${joke}",
        }
      ],
    });

    return NextResponse.json({ evaluation: response.choices[0].message.content });
  } catch (error) {
    // Type guard to handle different error types
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Fallback for unknown error types
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}