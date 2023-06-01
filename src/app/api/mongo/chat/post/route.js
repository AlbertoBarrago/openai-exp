import { NextResponse } from "next/server";
import clientPromise from "../../../../../../mongo.conf";

export async function POST(req) {
  const data = await req.json();
  const client = await clientPromise;
  const collection = client.db(process.env.MONGODB_DB).collection("chat");
  const response = await collection.insertOne(data);

  return NextResponse.json({
    response,
    success: true,
  });
}
