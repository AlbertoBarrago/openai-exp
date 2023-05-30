"use client";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import { useEffect, useState } from "react";
import { CardList } from "@/components/result/cardList";
import { LoaderComponent } from "@/components/layout/loader";
import { LoadMore } from "@/components/result/loadMore";
import { FilterResult } from "@/components/result/filter";
import Confetti from "react-confetti";

async function getData(pageSize, filter = "") {
  const pageNumber = 1;
  if (filter === "all") {
    filter = "";
    pageSize = 10;
  }

  console.log(filter);

  const res = await fetch(
    `${process.env.BASE_URL}/api/mongo/getList/?pageSize=${pageSize}&pageNumber=${pageNumber}&q=${filter}`,
    {
      next: { revalidate: 10 }, // refresh every 10 second
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function ResultPage() {
  const [data, setData] = useState(null),
    [pageSize, setPageSize] = useState(10),
    [limit, setLimit] = useState(0),
    [isLoading, setIsLoading] = useState(true),
    [filter, setFilter] = useState(""),
    [isLoadMore, setIsLoadMore] = useState(false),
    [noMoreData, setNoMoreData] = useState(false);

  const handleLoadMore = async () => {
    // check if limit is over
    if (limit <= pageSize) {
      return;
    }

    setIsLoadMore(true);
    // setData(null)
    let newSize = pageSize + 5;
    setPageSize(newSize);
    // get data
    await getData(newSize, filter).then((data) => {
      setData(data.responseImageList);
      setIsLoadMore(false);
      setLimit(data.dataCount);
      if (data.dataCount <= newSize) {
        setNoMoreData(true);
      } else {
        setNoMoreData(false);
      }
    });
  };
  const handleFilter = async (filter) => {
    setIsLoadMore(true);
    setFilter(filter);
    let newSize = 10;
    await getData(newSize, filter).then((data) => {
      setData(data.responseImageList);
      setIsLoadMore(false);
      setLimit(data.dataCount);
      setPageSize(newSize);
      if (data.dataCount <= newSize) {
        setNoMoreData(true);
      } else {
        setNoMoreData(false);
      }
    });
  };

  useEffect(() => {
    getData(pageSize).then((data) => {
      setData(data.responseImageList);
      setIsLoading(false);
      setLimit(data.dataCount);
    });
  }, [pageSize]);

  return (
    <>
      <main id={"result"} className={`container mx-auto text-center w-100 p-2`}>
        {isLoading && (
          <LoaderComponent icon={`<i class="bi bi-arrow-clockwise"></i>`} />
        )}
        {data && (
          <>
            <Title title={"OpenAi"} subTitle={"results"} />
            <SubDescription
              description={"Stored creations"}
              limit={limit}
              dataLength={data.length}
            />
            <FilterResult handleFilter={handleFilter} />
            {isLoading && !data.length && (
              <>
                <p className={`w-100 text-center mt-12`}>
                  <i className="bi bi-triangle"></i>
                  <br />
                  Silence is <span className={`text-yellow-400`}>gold...</span>
                </p>
              </>
            )}
            {data && (
              <div
                className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 place-items-center gap-5 mt-10`}
              >
                <CardList data={data} />
              </div>
            )}
            <LoadMore
              handleLoadMore={handleLoadMore}
              isLoading={isLoadMore}
              isDisabled={noMoreData}
            />
          </>
        )}
      </main>
    </>
  );
}
