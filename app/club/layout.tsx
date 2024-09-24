import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';

function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="intro" className="w-full max-w-5xl mt-10 ">
      <TabsList>
        <TabsTrigger value="intro" color="gray">
          소개
        </TabsTrigger>
        <TabsTrigger value="schedule" color="gray">
          일정
        </TabsTrigger>
        <TabsTrigger value="member" color="gray">
          회원
        </TabsTrigger>
        <TabsTrigger value="manage" color="gray">
          관리
        </TabsTrigger>
      </TabsList>
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow flex-1 space-y-4 p-8">
        {children}
      </div>
    </Tabs>
  );
}

export default ClubLayout;
