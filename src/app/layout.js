import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-medium-image-zoom/dist/styles.css'
import {ClerkProvider} from "@clerk/nextjs";
import Head from "next/head";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import Script from "next/script";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <Head>
                <title>Albz - OpenAi</title>
                <meta name="description" content="OpenAi experiments"/>
            </Head>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-G8986MEGCD"/>
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
            <body className={`overflow-x-hidden min-h-screen`}>
             <Header/>
                {children}
             <Footer/>
            </body>
            </html>
        </ClerkProvider>
    )
}
