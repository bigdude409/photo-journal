import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build what's next!",
  description: "Comming soon...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark:bg-gray-900 bg-white">
      <body className="${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 bg-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}


