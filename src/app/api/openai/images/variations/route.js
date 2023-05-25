import {openai} from "../../../../../../utils/utils";
import {NextResponse} from "next/server";

export async function POST(req) {
    const data = await req.json()
    let urlImage = '';

    let request = {
        prompt: data.prompt.toString(),
        n: data.n,
        size: data.size,
        fileForm: data.fileForm,
        userId: data.userId
    }

    try {
        const imageResp = await openai.createImageEdit(
            request.fileForm,
            request.prompt,
            request.n,
            request.size
        )
        urlImage = imageResp?.data.data[0].url;
    }  catch (error) {
        return NextResponse.error(new Error(error));
    }

    return NextResponse.json({
        imageList: urlImage,
    });
}