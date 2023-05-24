import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-medium-image-zoom/dist/styles.css'
import {ClerkProvider} from "@clerk/nextjs";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import Script from "next/script";
import {AppContextProvider} from "@/app/Context/AppContext";

export const metadata = {
    title: 'Albz - OpenAi',
    description: <meta name="description" content="OpenAi experiments"/>,
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
                <html lang="en">
                    <body className={`overflow-x-hidden min-h-screen`}>
                    <AppContextProvider>
                        <Header/>
                            {children}
                        <Footer/>
                    </AppContextProvider>
                    </body>
                </html>
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
        </ClerkProvider>
    )
}
