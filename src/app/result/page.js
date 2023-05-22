'use client';
import {Title} from "@/components/layout/title";
import {SubDescription} from "@/components/lab/subDescription";
import {useEffect, useState} from "react";
import {CardList} from "@/components/result/cardList";
import {LoaderComponent} from "@/components/layout/loader";
import {LoadMore} from "@/components/result/loadMore";
import {FilterResult} from "@/components/result/filter";

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
    const [data, setData] = useState(null), [pageSize, setPageSize] = useState(10), [limit, setLimit] = useState(0), [isLoading, setIsLoading] = useState(true);

    /**
     * Handle load more
     * @return {Promise<void>}
     */
    const handleLoadMore = async () => {
        // check if limit is over
        if (limit <= pageSize) {
            console.log("Over limit -> ", limit);
            return;
        }
        // reset data
        setData(null);
        setIsLoading(true)
        // increase page size
        let newSize = pageSize + 5;
        setPageSize(newSize);
        // get data
        await getData(newSize).then(data => {
            setData(data.responseImageList);
            setIsLoading(false);
        });
    }
    const handleFilter = async (filter) => {
        console.log(filter);
    }

    useEffect(() => {
        getData(pageSize).then(data => {
            setData(data.responseImageList);
            setIsLoading(false);
            setLimit(data.dataCount);
        });
    }, []);


    return (<>
        <main className={`container mx-auto text-center w-100 p-2`}>
            {isLoading && (<LoaderComponent icon={`<i class="bi bi-arrow-clockwise"></i>`}/>)}
            {(!isLoading && data) && (<>
                <Title title={'OpenAi'} subTitle={'results'}/>
                <SubDescription description={'Stored creations'} limit={limit} dataLength={data.length}/>
                {/*<FilterResult handleFilter={handleFilter}/>*/}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mt-10`}>
                    <CardList data={data}/>
                </div>
                <LoadMore handleLoadMore={handleLoadMore} isLoading={isLoading}/>
            </>)}
        </main>
    </>)
}