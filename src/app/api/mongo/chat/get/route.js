import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  handleChatTimeStamp,
  handleNameByMongoId,
  orderDateBy,
} from "../../../../../../modules/utils";
import clientPromise from "../../../../../../mongo.conf";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Pagination and filter
  const pageSize = searchParams.get("pageSize") || 50;
  const pageNumber = searchParams.get("pageNumber") || 1;
  const q = searchParams.get("q") || "";

  // Connect to MongoDB
  const client = await clientPromise;
  const { userId } = getAuth(req);
  const collection = client.db("openai-exp").collection("chat");

  const options = {
    skip: (Number(pageNumber) - 1) * Number(pageSize),
    limit: Number(pageSize),
  };

  const query = {
    userId: userId,
    message: q.toString() ? q.toString() : { $exists: true },
  };

  const dataCount = await collection.countDocuments(query);
  //get Image by userId
  const data = await collection.find(query, options).toArray();

  //order by creationDate
  const ordered = orderDateBy(data, "creationDate");

  //prepare data for table
  let responseChatList = [];
  // Remove ID field from every document
  ordered.forEach((item) => {
    responseChatList.push({
      userId: handleNameByMongoId(item.userId),
      creationDate: handleChatTimeStamp(item.creationDate),
      message: item.message,
      avatar: item.avatar,
      header: item.header,
      footer: false,
      side: item.side,
    });
  });

  console.log("DATA CHAT CREATED ---> ", responseChatList);

  return NextResponse.json({
    responseChatList,
    dataCount,
  });
}
