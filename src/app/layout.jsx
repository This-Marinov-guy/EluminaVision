import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { StoreProvider } from "../stores/storeProvider";
import Script from "next/script";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SessionProvider from "@/layout/SessionProvider";

// Font configuration
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Elumina Vision",
  description:
    "Elumina Vision is a forward-thinking marketing agency dedicated to helping brands grow, engage, and thrive in the digital world. We specialize in brand strategy, digital marketing, content creation, and social media management, crafting data-driven campaigns that drive real results.",
};

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.eluminavision.com",
    name: "Elumina Vision",
    description: "Your portal to the digital world!",
    image: "https://www.eluminavision.com/assets/img/logo.png",
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=5" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/img/logo.png" />
        <meta property="og:image" content="/img/logo.png" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/img/logo.png" />
        <meta
          name="description"
          lang="en"
          content="We help business show their best side in the digital world by providing online platforms, websites, marketing materials and many more features for bootstrapping a business."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="robots" href="/robots.txt" /> <link rel="manifest" href="/manifest.json" />
        <meta name="facebook-domain-verification" content="sz77ets71sg2lttigkxfx5b2vz075z" />
      </head>
      <body className={`${poppins.variable} overflow-x-hidden w-screen`}>
        <StoreProvider>
          <ChakraProvider>
            <SessionProvider />
            {children}
          </ChakraProvider>
        </StoreProvider>
      </body>
      <Script id="clarity-script" strategy="afterInteractive">
        {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          t.onload = function() {
            window.clarity && window.clarity("consent");
          };
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
      `}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
    </html>
  );
}
