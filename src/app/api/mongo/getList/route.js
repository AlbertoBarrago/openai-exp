import clientPromise from "../../../../../mongo.conf";
import {NextResponse} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {handleTimeStamp, orderDateBy} from "../../../../../utils/utils";

export async function GET(req) {
    console.log("GET START: mongo/getList");
    const {searchParams} = new URL(req.url);
    // Pagination and filter
    const pageSize = searchParams.get('pageSize') || 10;
    const pageNumber = searchParams.get('pageNumber') || 1;
    const q = searchParams.get('q') || '';

    // Connect to MongoDB
    const client = await clientPromise;
    const {userId} = getAuth(req);
    const collection = client.db('openai-exp').collection('images');

    // Setting options
    const options = {
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        limit: Number(pageSize),
    };
    //get count by userId
    const query = {
        userId: userId,
        type: q.toString() ? q.toString() : {$exists: true}
    }
    const dataCount = await collection.countDocuments(query);
    //get Image by userId
    const data = await collection.find(query, options).toArray();
    //order by creationDate
    const ordered = orderDateBy(data, 'creationDate');
    //prepare data for table
    let responseImageList = [];
    // Remove ID field from every document
    ordered.forEach((item) => {
        item.creationDate = handleTimeStamp(item.creationDate);
        responseImageList.push({
            id: item._id,
            // userId: item.userId,
            type: item.type,
            title: item.title,
            creationDate: item.creationDate,
            image: item.urlImage,
        });

    })

    console.log("GET END: mongo/getList");
    // Return the data or use it in your Next.js component
    return NextResponse.json({
        responseImageList,
        dataCount,
    })
}