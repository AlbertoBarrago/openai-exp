import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                <title>Albz - OpenAi</title>
                <meta name="description" content="OpenAi experiments"/>
            </head>
                <body>{children}</body>
            </html>
        </ClerkProvider>
    )
}
