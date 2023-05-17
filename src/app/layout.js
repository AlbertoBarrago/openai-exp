import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import {Main} from "@/components/main";

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <Main>
                {children}
            </Main>
        </ClerkProvider>
    )
}
