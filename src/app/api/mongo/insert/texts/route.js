import clientPromise from "../../../../../../mongo.conf";
import {NextResponse} from "next/server";

export async function POST(req) {
    const data = await req.json()
    const client = await clientPromise;
    const collection = client.db('openai-exp').collection('texts');
    const response = await collection.insertOne(data);

    if(response) {
        return  NextResponse.json({
            imageList: response,
            success: true
        })
    } else {
        return NextResponse.json({
            imageList: null,
            success: false
        })
    }
}

