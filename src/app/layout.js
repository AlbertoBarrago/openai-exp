import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-medium-image-zoom/dist/styles.css";
import "animate.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
import { AppContextProvider } from "@/app/context/appContext";

export const metadata = {
  title: "Albz - OpenAi",
  description: <meta name="description" content="OpenAi experiments" />,
  icons: [
    {
      rel: "android-chrome-192x192",
      sizes: "192x192",
      href: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome-512x512",
      sizes: "512x512",
      href: "/favicon/android-chrome-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/favicon/site.webmanifest",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`overflow-x-hidden min-h-screen`}>
          <AppContextProvider>
            <Header />
            {children}
            <Footer />
          </AppContextProvider>
        </body>
      </html>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-G8986MEGCD"
      />
      <Script
        id="google-analytics"
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
  );
}
