import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ClerkProvider} from "@clerk/nextjs";
import Head from "next/head";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <Head>
                <title>Albz - OpenAi</title>
                <meta name="description" content="OpenAi experiments"/>
            </Head>
            <body className={`overflow-x-hidden min-h-screen`}>
             <Header/>
                {children}
             <Footer/>
            </body>
            </html>
        </ClerkProvider>
    )
}
