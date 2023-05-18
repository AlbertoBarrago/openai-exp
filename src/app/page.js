'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Title} from "@/components/layout/title";
import {DescriptionFirstPage} from "@/components/home/descriptions/firstPage";
import {GoToDashboard} from "@/components/home/goToDashboard";


export default function Home() {
    const {isLoaded, isSignedIn} = useAuth();
    const router = useRouter();

    const goToDashboard = () => {
        void router.push('/dashboard');
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>
        }
        return (
            <>
                <main className={`container mx-auto text-center w-100 p-2`}>
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


