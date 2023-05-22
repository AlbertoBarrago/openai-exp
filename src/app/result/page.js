'use client';
import {Title} from "@/components/layout/title";
import {TableResult} from "@/components/result/table";
import {SubDescription} from "@/components/dashboard/subDescription";
import {useEffect, useState} from "react";
import {CardList} from "@/components/result/cardList";
import {LoaderComponent} from "@/components/layout/loader";

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/result`, {
        next: { revalidate: 10 } // refresh every 10 second
    });
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
                {/*{!isLoading && (<TableResult data={data}/>)}*/}
                {isLoading && ( <LoaderComponent icon={`<i class="bi bi-arrow-clockwise"></i>`}/> )}
                {(!isLoading && data) && (
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 mb-10`}>
                        <CardList data={data} />
                        </div>)}
            </main>
        </>)
}