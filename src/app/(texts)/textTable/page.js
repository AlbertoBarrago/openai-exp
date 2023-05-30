"use client";
import { Title } from "@/components/layout/title";
import { SubDescription } from "@/components/lab/subDescription";
import { useContext, useEffect, useState } from "react";
import { TableText } from "@/components/commons/table";
import { AppContext } from "@/app/context/AppContext";
import { LoaderComponent } from "@/components/layout/loader";

async function getTextData(pageSize, filter = "") {
  const pageNumber = 1;
  if (filter === "all") {
    filter = "";
    pageSize = 10;
  }

  const res = await fetch(
    `${process.env.BASE_URL}/api/mongo/getTextList/?pageSize=${pageSize}&pageNumber=${pageNumber}&q=${filter}`,
    {
      next: { revalidate: 10 }, // refresh every 10 second
    }
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function TextTable() {
  const [dataText, setDataText] = useState([]),
    { appState } = useContext(AppContext),
    [pageSize, setPageSize] = useState(10),
    [setupTable, setSetupTable] = useState({
      dataTheme: appState.theme,
      compact: appState.isMobile,
      zebra: true,
    });

  useEffect(() => {
    getTextData(pageSize).then((resp) => {
      setDataText(resp);
    });
  }, []);

  useEffect(() => {
    setSetupTable({
      dataTheme: appState.theme,
      compact: appState.isMobile,
      zebra: true,
    });
  }, [appState]);

  return (
    <main
      className={`container mx-auto text-center w-100 p-2 animate__animated animate__fadeIn overflow-x-hidden`}
    >
      <Title title={"OpenAi"} subTitle={"text"} />
      <SubDescription
        description={"Here you can test the Text generation API"}
      />
      {!dataText?.responseTextList && <LoaderComponent />}
      {dataText?.responseTextList && (
        <TableText args={setupTable} data={dataText.responseTextList} />
      )}
    </main>
  );
}
