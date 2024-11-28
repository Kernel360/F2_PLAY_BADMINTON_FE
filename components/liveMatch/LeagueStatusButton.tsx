import { Button } from "@/components/ui/Button";
import { AccordionTrigger } from "@/components/ui/accordion";
import type { LeagueStatus } from "@/types/commonTypes";
import Link from "next/link";
import React from "react";

interface LeagueStatusButtonProps {
  status: LeagueStatus;
  clubToken: string;
  leagueId: number;
}

function LeagueStatusButton(props: LeagueStatusButtonProps) {
  const { status, clubToken, leagueId } = props;

  if (status === "PLAYING") {
    return (
      <AccordionTrigger className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-orange-500 text-white hover:no-underline">
        진행 상황 보기
      </AccordionTrigger>
    );
  }
  if (status === "RECRUITING") {
    return (
      <Link href={`/club/${clubToken}/league/${leagueId}`}>
        <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-blue-500 text-white">
          모집중
        </Button>
      </Link>
    );
  }

  if (status === "RECRUITING_COMPLETED") {
    return (
      <Link href={`/club/${clubToken}/league/${leagueId}`}>
        <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-600">
          모집마감
        </Button>
      </Link>
    );
  }

  if (status === "CANCELED") {
    return (
      <Link href={`/club/${clubToken}/league/${leagueId}`}>
        <Button
          variant="outline"
          className="p-2 h-8 rounded-md text-xs w-[105px] border text-white bg-gray-600 hover:bg-gray-500 hover:text-white "
        >
          취소된 경기
        </Button>
      </Link>
    );
  }

  if (status === "FINISHED") {
    return (
      <Link href={`/club/${clubToken}/league/${leagueId}`}>
        <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-primary hover:border-primary hover:text-primay hover:bg-white">
          종료된 경기
        </Button>
      </Link>
    );
  }
}

export default LeagueStatusButton;
