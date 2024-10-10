import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { headers } from "next/headers";
import Link from "next/link";
import type React from "react";

function ClubLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path")?.split("/")[2];

  const activeTab = () => {
    if (pathname === undefined) return "intro";
    return pathname;
  };

  return (
    <Tabs defaultValue={activeTab()} className="w-full max-w-5xl mt-10 ">
      <TabsList>
        <Link href="/my-club">
          <TabsTrigger value="intro" color="gray">
            소개
          </TabsTrigger>
        </Link>
        <Link href="/my-club/schedule">
          <TabsTrigger value="schedule" color="gray">
            일정
          </TabsTrigger>
        </Link>
        <Link href="/my-club/member">
          <TabsTrigger value="member" color="gray">
            회원
          </TabsTrigger>
        </Link>
        <Link href="/my-club/manage">
          <TabsTrigger value="manage" color="gray">
            관리
          </TabsTrigger>
        </Link>
      </TabsList>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow flex-1 space-y-4 p-8 min-h-[530px]">
        {children}
      </div>
    </Tabs>
  );
}

export default ClubLayout;
