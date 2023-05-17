import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import Head from "next/head";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {Suspense} from "react";
import Loading from "@/app/dashboard/loading";
import Error from "@/app/dashboard/error";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <Head>
                <title>Albz - OpenAi</title>
                <meta name="description" content="OpenAi experiments"/>
            </Head>
            <body>
            <Suspense fallback={<Loading/>}>
                <Header/>
                <ErrorBoundary fallback={<Error/>}>
                    {children}
                </ErrorBoundary>
                <Footer/>
            </Suspense>
            </body>
            </html>
        </ClerkProvider>
    )
}
