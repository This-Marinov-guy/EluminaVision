import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { StoreProvider } from "../stores/storeProvider";
import Footer from "../components/_module/footer";
import Script from "next/script";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />

        <meta name="facebook-domain-verification" content="sz77ets71sg2lttigkxfx5b2vz075z" />
      </head>
      <body className={`${poppins.variable} overflow-x-hidden w-screen`}>
        <StoreProvider>
          <ChakraProvider>
            {children}
            <Footer />
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
    </html>
  );
}
