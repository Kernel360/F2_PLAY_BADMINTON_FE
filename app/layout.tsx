import "./globals.css";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/toaster";
import { TanstackClientProvider } from "@/lib/TanstackClientProvider";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "콕콕",
  description:
    "배드민턴을 사랑하는 사람들을 위한 서비스예요! 동호회 찾기부터 대회 참여, 경기 결과 확인까지, 배드민턴을 더 즐겁게 만들어 드릴게요! 🏸",
  icons: {
    icon: "/favicon.ico",
  },
};

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
