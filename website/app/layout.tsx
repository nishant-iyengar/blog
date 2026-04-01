import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nishant Iyengar",
  description: "Personal website of Nishant Iyengar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
