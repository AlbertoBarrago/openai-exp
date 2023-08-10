import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
});

export async function POST(req) {
  const postText = await req.json();

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${postText}`,
      temperature: 2,
      max_tokens: 4000,
      top_p: 1,
      best_of: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    const message = `${response?.choices[0]?.text.trim()}...`;

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ message: "Internal Server Error" }, 500);
  }
}
