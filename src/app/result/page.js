'use client';
import {Title} from "@/components/layout/title";
import {SubDescription} from "@/components/dashboard/subDescription";
import {useEffect, useState} from "react";
import {CardList} from "@/components/result/cardList";
import {LoaderComponent} from "@/components/layout/loader";

async function getData(pageSize) {
    const pageNumber = 1;
    const res = await fetch(`${process.env.BASE_URL}/api/mongo/getList/?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        next: {revalidate: 60} // refresh every 10 second
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default function Result() {
    const [data, setData] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [limit, setLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getData(pageSize).then(data => {
            setData(data.responseImageList);
            setIsLoading(false);
            setLimit(data.dataCount);
        });
    }, []);
    const handleLoadMore = async () => {
        console.log("Limit ->", limit);
        if (limit <= pageSize) {
            console.log("Over limit -> ", limit);
            return;
        }
        setData(null);
        setIsLoading(true)
        let newSize = pageSize + 5;
        setPageSize(newSize);
        await getData(newSize).then(data => {
            setData(data.responseImageList);
            setIsLoading(false);
        });
    }

    return (
        <>
            <main className={`container mx-auto text-center w-100 p-2`}>
                <Title title={'OpenAi'} subTitle={'results'}/>

                {isLoading && (<LoaderComponent icon={`<i class="bi bi-arrow-clockwise"></i>`}/>)}
                {(!isLoading && data) && (
                    <>
                    <SubDescription description={'Stored creations'} dataLength={data.length}/>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 mt-10`}>
                        <CardList data={data}/>
                    </div>
                        <div className={`p-3 mt-4 mb-4`}>
                            <button onClick={handleLoadMore} className={`btn btn-secondary`}>Load More {isLoading && (<> <i className="animate-spin bi bi-arrow-clockwise"></i> </>)}</button>
                        </div>
                    </>
                )}
            </main>
        </>)
}