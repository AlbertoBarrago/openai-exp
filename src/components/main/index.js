import Head from 'next/head';
import {Suspense} from "react";
import Loading from "@/app/loader";
export const Main = ({children}) => {
    return (
        <>
            <html lang="en">
                <Head>
                    <title>Albz - OpenAi</title>
                    <meta name="description" content="OpenAi experiments"/>
                </Head>
                <Suspense fallback={<Loading/>}>
                     <body>{children}</body>
                </Suspense>
            </html>
        </>
    )
}