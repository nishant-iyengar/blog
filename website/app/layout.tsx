import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalBouncingBall from "@/components/ConditionalBouncingBall";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nishant",
  description: "Welcome to my blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ConditionalBouncingBall />
        {children}
      </body>
    </html>
  );
}
