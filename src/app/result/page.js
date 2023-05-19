import {Title} from "@/components/layout/title";
import fetchCollectionData from "@/app/result/service/dbSetup";
import Image from "next/image";
import {TableResult} from "@/components/result/table";

async function getMongodb() {
    return await fetchCollectionData({dbname: 'openai-exp', collectionName: 'images'});
}
export default async function Result() {
    const data = await getMongodb();

    return (
        <>
            <main className={`container mx-auto text-center w-100 p-2`}>
                <Title title={'OpenAi'} subTitle={'results'}/>
                {<TableResult data={data}/>}
            </main>
        </>)
}