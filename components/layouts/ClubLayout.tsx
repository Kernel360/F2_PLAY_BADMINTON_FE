"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetClubMembersCheck } from "@/lib/api/hooks/clubMemberHook";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function ClubLayout({ children }: { children: React.ReactNode }) {
  const { clubId } = useParams();
  const pathname = usePathname();
  const clubPath = pathname.split("/")[3];

  const { data: isJoined } = useGetClubMembersCheck(clubId as string);

  const activeTab = () => {
    if (!clubPath) return "intro";
    return clubPath;
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-3">
      <Tabs
        defaultValue={activeTab()}
        className="w-full bg-white p-0 rounded-none shadow-none"
      >
        <TabsList className="flex justify-start gap-8 px-4 bg-white p-0 border-b rounded-none shadow-none">
          <TabsTrigger
            value="intro"
            className={`pb-2 text-base font-medium border-b-2 rounded-none ${
              activeTab() === "intro"
                ? "font-bold data-[state=active]:text-black border-black"
                : "text-gray-500 border-transparent hover:text-black hover:border-black"
            }`}
          >
            <Link href={`/club/${clubId}`}>소개</Link>
          </TabsTrigger>
          <TabsTrigger
            value="league"
            className={`pb-2 text-base font-medium border-b-2 rounded-none ${
              activeTab() === "league"
                ? "font-bold data-[state=active]:text-black text-black border-black"
                : "text-gray-500 border-transparent hover:text-black hover:border-black"
            }`}
          >
            <Link href={`/club/${clubId}/league`}>경기</Link>
          </TabsTrigger>
          {isJoined?.data?.is_club_member && (
            <TabsTrigger
              value="member"
              className={`pb-2 text-base font-medium border-b-2 rounded-none ${
                activeTab() === "member"
                  ? "font-bold data-[state=active]:text-black text-black border-black"
                  : "text-gray-500 border-transparent hover:text-black hover:border-black"
              }`}
            >
              <Link href={`/club/${clubId}/member`}>회원</Link>
            </TabsTrigger>
          )}
          {isJoined?.data?.role === "ROLE_OWNER" && (
            <TabsTrigger
              value="manage"
              className={`pb-2 text-base font-medium border-b-2 rounded-none ${
                activeTab() === "manage"
                  ? "font-bold data-[state=active]:text-black text-black border-black"
                  : "text-gray-500 border-transparent hover:text-black hover:border-black"
              }`}
            >
              <Link href={`/club/${clubId}/manage`}>관리</Link>
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default ClubLayout;
