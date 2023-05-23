import clientPromise from "../../../../../mongo.conf";
import {NextResponse} from "next/server";
import {handleTimeStamp, orderDateBy} from "../../../../../utils/utils";

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const q = searchParams.get('q') || 'created';

    const client = await clientPromise;
    const collection = client.db('openai-exp').collection('images');

    const query = {
        type: q.toString()
    }

    const dataCount = await collection.countDocuments(query);
    const data = await collection.find(query).toArray();

    //order by creationDate
    const ordered = orderDateBy(data, 'creationDate');
    //prepare data for table
    let responseImageList = [];
    // Remove ID field from every document
    ordered.forEach((item) => {
        item.creationDate = handleTimeStamp(item.creationDate);
        responseImageList.push({
            id: item._id,
            type: item.type,
            title: item.title,
            creationDate: item.creationDate,
            image: item.urlImage,
        });

    })

    return NextResponse.json({
        responseImageList,
        dataCount
    });

}