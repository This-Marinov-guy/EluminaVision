import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Footer from "../components/_module/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elumina Vision",
  description: "Elumina Vision",
};

import "/public/icon-fonts/fontawesome-5.0.6/css/fontawesome-all.min.css";
import "/public/icon-fonts/flat-icon/flaticon.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${poppins.variable} overflow-x-hidden w-screen`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
