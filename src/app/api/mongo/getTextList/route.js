import clientPromise from "../../../../../mongo.conf";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  handleNameByMongoId,
  handleTimeStamp,
  orderDateBy,
} from "../../../../../modules/utils";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Pagination and filter
  const pageSize = searchParams.get("pageSize") || 50;
  const pageNumber = searchParams.get("pageNumber") || 1;
  const q = searchParams.get("q") || "";

  // Connect to MongoDB
  const client = await clientPromise;
  const { userId } = getAuth(req);
  const collection = client.db("openai-exp").collection("texts");

  const options = {
    skip: (Number(pageNumber) - 1) * Number(pageSize),
    limit: Number(pageSize),
  };

  const query = {
    userId: userId,
    answer: q.toString() ? q.toString() : { $exists: true },
  };

  const dataCount = await collection.countDocuments(query);
  //get Image by userId
  const data = await collection.find(query, options).toArray();

  //order by creationDate
  const ordered = orderDateBy(data, "creationDate");

  //prepare data for table
  let responseTextList = [];
  // Remove ID field from every document
  ordered.forEach((item) => {
    responseTextList.push({
      userId: handleNameByMongoId(item.userId),
      answer: item.answer,
      response: item.response,
      creationDate: handleTimeStamp(item.creationDate),
    });
  });

  console.log("DATA CREATED ---> ", responseTextList);
  return NextResponse.json({
    responseTextList,
    dataCount,
  });
}
