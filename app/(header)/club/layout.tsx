import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Link from "next/link";
import type React from "react";

function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="intro" className="w-full max-w-5xl mt-10 ">
      <TabsList>
        <Link href="/club/intro">
          <TabsTrigger value="intro" color="gray">
            소개
          </TabsTrigger>
        </Link>
        <Link href="/club/schedule">
          <TabsTrigger value="schedule" color="gray">
            일정
          </TabsTrigger>
        </Link>
        <Link href="/club/member">
          <TabsTrigger value="member" color="gray">
            회원
          </TabsTrigger>
        </Link>
        <Link href="/club/manage">
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
