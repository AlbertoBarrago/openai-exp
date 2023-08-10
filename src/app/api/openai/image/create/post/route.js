import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
});

export async function POST(req) {
  const prompt = await req.json();
  console.log("prompt", prompt);

  try {
    const imageResp = await openai.images.generate({
      prompt: `${prompt.description}`,
      n: 1,
      size: "1024x1024",
    });

    const urlImage = imageResp?.data[0]?.url;
    return NextResponse.json({ urlImage });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ message: "Error generating image" }, 500);
  }
}
