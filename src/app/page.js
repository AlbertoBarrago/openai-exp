'use client';
import {RedirectToSignIn, useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Title} from "@/components/layout/title";
import {DescriptionFirstPage} from "@/components/home/descriptions/firstPage";
import {GoToLab} from "@/components/home/goToLab";
import Script from 'next/script'


export default function Home() {
    const {isLoaded, isSignedIn} = useAuth();
    const router = useRouter();

    const goToDashboard = () => {
        void router.push('/lab');
    }

    const checkAuth = () => {
        if (!isLoaded || !isSignedIn) {
            return <RedirectToSignIn/>
        }
        return (
            <>
                <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"/>
                <Script
                    id='google-analytics'
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-G8986MEGCD', {
                        page_path: window.location.pathname,
                        });
                        `,
                    }}
                />
                <main className={`container mx-auto text-center w-100 p-2`}>
                    <Title title={'OpenAi'} subTitle={'Testing Project'}/>
                    <DescriptionFirstPage router={router}/>
                    <GoToLab goToDashboard={goToDashboard}/>
                </main>
            </>)
    }
    return (
        <>
            {checkAuth()}
        </>
    )
}


