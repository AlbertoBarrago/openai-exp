import clientPromise from "../../../../mongo.conf";
import {NextResponse} from "next/server";

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

export async function GET() {
    const client = await clientPromise;
    const collection = client.db('openai-exp').collection('images');

    const data = await collection.find().toArray()

    //order by alphabet
    data.sort((a, b) => {
        if (a.title < b.title) {
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


