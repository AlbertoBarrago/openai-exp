'use client';
import {Title} from "@/components/layout/title";
import {TableResult} from "@/components/result/table";
import {SubDescription} from "@/components/dashboard/subDescription";
import {useEffect, useState} from "react";

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/result`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default function Result() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getData().then(data => {
            setData(data.responseImageList);
            setIsLoading(false);
        });
    },[]);

    return (
        <>
            <main className={`container mx-auto text-center w-100 p-2`}>
                <Title title={'OpenAi'} subTitle={'results'}/>
                <SubDescription description={'Stored creations'}/>
                {!isLoading && (<TableResult data={data}/>)}
            </main>
        </>)
}