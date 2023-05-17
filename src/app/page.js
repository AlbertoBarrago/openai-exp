'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Title} from "@/components/title";
import Image from "next/image";
import {DescriptionFirstPage} from "@/components/descriptions/firstPage";
import {GoToDashBoard} from "openai-exp/src/components/goToDashBoard";


export default function Home() {
    const {isLoaded, isSignedIn} = useAuth();
    const router = useRouter();

    const goToDashboard = () => {
        void router.push('/dashboard');
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>;
        }
        return (
            <>
                <main className={`flex w-100 text-center flex-col justify-between p-3`}>
                    <Title title={'OpenAi'} subTitle={'Testing Project'}/>
                    <DescriptionFirstPage/>
                    <GoToDashBoard goToDashboard={goToDashboard}/>
                </main>
            </>);
    }
    return (
        <>
            {checkAuth()}
        </>
    )
}


