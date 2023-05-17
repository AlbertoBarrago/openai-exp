import Head from 'next/head';
export const Main = ({children}) => {
    return (
        <>
            <html lang="en">
                <Head>
                    <title>Albz - OpenAi</title>
                    <meta name="description" content="OpenAi experiments"/>
                </Head>
                <body>{children}</body>
            </html>
        </>
    )
}