import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
});

export async function POST(req) {
  const reqJson = await req.json();
  console.log("POST ---> ", reqJson);
  let chatMsg = "";
  const body = {
    model: "gpt-4",
    messages: [
      {
        content: reqJson.message.toString(),
        role: reqJson.role,
      },
    ],
  };
  try {
    const response = await openai.chat.completions.create(body, null);
    console.log("RESPONSE ---> ", response);
    chatMsg = response?.choices[0]?.message;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, success: false });
  }

  console.log("CHAT MSG ---> ", chatMsg);

  return NextResponse.json({ chatMsg, success: true });
}
