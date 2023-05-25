import {openai} from "../../../../../../utils/utils";
import {NextResponse} from "next/server";

export async function POST(req) {
    const data = await req.json()


    try {
        const imageResp = await openai.createImage(
            {
                prompt: `${data.description}`,
                n: 1,
                size: "1024x1024",
            }
        )

        return NextResponse.json({
            imageList: imageResp?.data.data[0].url,
        });
    } catch (error) {
        return NextResponse.error(new Error(error));
    }


}