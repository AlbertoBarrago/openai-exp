import {NextResponse} from "next/server";

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryUploadPreset = process.env.CLD_CLOUD_NAME;

export async function POST(req) {
    const reqResp = await req.json()
    console.log('imageUrl', reqResp.imageUrl);
    const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            file: reqResp.imageUrl,
            api_key: cloudinaryApiKey,
            upload_preset: cloudinaryUploadPreset
        }),
    });

    // Check the response from Cloudinary
    const data = await response.json();

    // Return the image URL from Cloudinary
    return NextResponse.json({
        data,
        success: true
    })
}