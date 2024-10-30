import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/toaster";
import { TanstackClientProvider } from "@/lib/TanstackClientProvider";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const path = headerList.get("x-current-path");

  return (
    <html lang="ko">
      <body className="antialiased w-full flex flex-col justify-start items-center min-h-screen">
        <div className="w-full max-w-5xl">
          <TanstackClientProvider>
            {path !== "/login" && <Header />}
            {children}
          </TanstackClientProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
