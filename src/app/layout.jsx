import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import { StoreProvider } from "../stores/storeProvider";
import Footer from "../components/_module/footer";

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
  description: "Elumina Vision",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${poppins.variable} overflow-x-hidden w-screen`}>
        <StoreProvider>
          <ChakraProvider>
            {children}
            <Footer />
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
