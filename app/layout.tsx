"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/Header";
import { TanstackClientProvider } from "@/lib/TanstackClientProvider";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full flex flex-col justify-start items-center min-h-screen`}
      >
        <div className="w-full max-w-5xl">
          <TanstackClientProvider>
            {path !== "/login" && <Header />}
            {children}
          </TanstackClientProvider>
        </div>
      </body>
    </html>
  );
}
