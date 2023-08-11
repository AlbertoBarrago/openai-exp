import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
});

export async function POST(req) {
  const postText = await req.json();

  console.log("TEXT API - postText", postText);

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${postText.text}`,
      temperature: 0.7,
    });
    const message = `${response?.choices[0]?.text.trim()}...`;
    console.log("TEXT API - openai", message);
    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ message: "Internal Server Error" }, 500);
  }
}
