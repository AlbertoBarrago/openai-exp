"use client";
import { useRouter } from "next/navigation";
import { Title } from "@/components/layout/title";
import { DescriptionFirstPage } from "@/components/home/descriptions/firstPage";
import { GoToLab } from "@/components/home/goToLab";
import { AppContext } from "@/app/context/AppContext";
import { useContext, useState } from "react";

export default function Home() {
  const router = useRouter(),
    [loading, setLoading] = useState(setTimeout(() => setLoading(false), 300)),
    { appState } = useContext(AppContext);

  const goTo = (route) => {
    void router.push(route);
  };

  const goToImage = () => {
    void router.push("/text");
  };

  const checkAuth = () => {
    return (
      <main
        className={`container mx-auto text-center w-100 p-2 animate__animated animate__fadeIn`}
      >
        <Title title={"OpenAi"} subTitle={"Testing Project"} />
        <DescriptionFirstPage router={router} appState={appState} />
        <GoToLab goTo={goTo} />
      </main>
    );
  };

  return <>{!loading && checkAuth()}</>;
}
