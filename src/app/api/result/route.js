import clientPromise from "../../../../mongo.conf";
import {NextResponse} from "next/server";
import {getAuth} from "@clerk/nextjs/server";

const handleTimeStamp = (date) => {
    const dateformat = new Date(date);
    return dateformat.toLocaleDateString("it-IT", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

export async function GET(req) {
    const client = await clientPromise;
    const { userId } = getAuth(req);
    const collection = client.db('openai-exp').collection('images');

    //get Image by userId
    const data = await collection.find({userId:userId}).toArray();

    //order by alphabet
    data.sort((a, b) => {
        if (a.creationDate > b.creationDate) {
            return -1;
        }
        return 1;
    })
    //prepare data for table
    let responseImageList = [];
    // Remove ID field from every document
    data.forEach((item) => {
        // delete item._id;
        // delete item.userId;
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

    // Return the data or use it in your Next.js component
    return NextResponse.json({
        responseImageList
    })
}


