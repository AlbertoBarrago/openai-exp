'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Title} from "@/components/title";
import {DescriptionFirstPage} from "@/components/descriptions/firstPage";
import {GoToDashboard} from "@/components/goToDashboard";


export default function Home() {
    const {isLoaded, isSignedIn} = useAuth();
    const router = useRouter();

    const goToDashboard = () => {
        void router.push('/(dashboard)');
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>
        }
        return (
            <>
                <main className={`flex w-100 text-center flex-col justify-between p-2`}>
                    <Title title={'OpenAi'} subTitle={'Testing Project'}/>
                    <DescriptionFirstPage/>
                    <GoToDashboard goToDashboard={goToDashboard}/>
                </main>
            </>)
    }
    return (
        <>
            {checkAuth()}
        </>
    )
}


