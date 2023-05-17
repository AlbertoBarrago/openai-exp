import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import Head from "next/head";
import {Header} from "@/components/header/header";
import {Footer} from "@/components/footer/footer";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <Head>
                <title>Albz - OpenAi</title>
                <meta name="description" content="OpenAi experiments"/>
            </Head>
            <body>
                <Header/>
                    {children}
                <Footer/>
            </body>
            </html>
        </ClerkProvider>
    )
}
