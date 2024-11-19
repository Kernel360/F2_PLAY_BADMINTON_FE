"use client";

import DateCarousel from "@/components/DayCarousel";
import { Button } from "@/components/ui/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useGetMainLeagues } from "@/lib/api/hooks/mainLeagueHook";
import type { LeagueStatus, TierLimit } from "@/types/leagueTypes";
import type { GetMainLeagues } from "@/types/mainLeagueTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import Spinner from "../Spinner";
import SImage from "../ui/Image";

const matchMockData = [
  {
    id: 1,
    stage: "8강 3세트",
    team1: {
      name: "유저1",
      profileImage: "https://avatar.iran.liara.run/public/28",
      score: 3,
    },
    team2: {
      name: "유저2",
      profileImage: "https://avatar.iran.liara.run/public/98",
      score: 9,
    },
  },
  {
    id: 2,
    stage: "4강 1세트",
    team1: {
      name: "유저3",
      profileImage: "https://avatar.iran.liara.run/public/29",
      score: 5,
    },
    team2: {
      name: "유저4",
      profileImage: "https://avatar.iran.liara.run/public/99",
      score: 7,
    },
  },
  {
    id: 3,
    stage: "결승",
    team1: {
      name: "유저5",
      profileImage: "https://avatar.iran.liara.run/public/30",
      score: 6,
    },
    team2: {
      name: "유저6",
      profileImage: "https://avatar.iran.liara.run/public/100",
      score: 4,
    },
  },
  {
    id: 4,
    stage: "4강 1세트",
    team1: {
      name: "유저3",
      profileImage: "https://avatar.iran.liara.run/public/29",
      score: 5,
    },
    team2: {
      name: "유저4",
      profileImage: "https://avatar.iran.liara.run/public/99",
      score: 7,
    },
  },
  {
    id: 5,
    stage: "결승",
    team1: {
      name: "유저5",
      profileImage: "https://avatar.iran.liara.run/public/30",
      score: 6,
    },
    team2: {
      name: "유저6",
      profileImage: "https://avatar.iran.liara.run/public/100",
      score: 4,
    },
  },
];

const renderLeagueStatusButton = (status: LeagueStatus) => {
  if (status === "PLAYING") {
    return (
      <AccordionTrigger className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-orange-500 text-white hover:no-underline">
        진행 상황 보기
      </AccordionTrigger>
    );
  }
  if (status === "RECRUITING") {
    return (
      // TODO: 링크 지정하기
      <Link href="/">
        <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-blue-500 text-white">
          모집중
        </Button>
      </Link>
    );
  }

  if (status === "RECRUITING_COMPLETED") {
    return (
      <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-600 cursor-default">
        모집마감
      </Button>
    );
  }
};

const renderLeagueTierBadge = (tier: TierLimit) => {
  if (tier === "GOLD") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-yellow-200 text-yellow-800"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }

  if (tier === "SILVER") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-gray-200 text-gray-700"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }

  if (tier === "BRONZE") {
    return (
      <Badge
        variant="outline"
        className="font-semibold px-2 py-0.5 text-xs rounded-full border-0 w-fit bg-orange-200 text-orange-800"
      >
        {getTierWithEmojiAndText(tier)}
      </Badge>
    );
  }
};

function LiveMatchList() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetMainLeagues({
    leagueStatus: "ALL",
    region: "ALL",
    date: selectedDate,
    size: 9,
  });

  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate); // 상태 업데이트
  };

  return (
    <div className="p-4 w-full bg-white">
      <DateCarousel onDateSelect={handleDateSelect} />
      <div className="mt-3 min-h-[50vh]">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Accordion type="single" collapsible>
            {data?.pages.map((group) => {
              return (
                <React.Fragment key={group.data?.number_of_elements}>
                  {group?.data?.content?.map((item: GetMainLeagues) => {
                    return (
                      <AccordionItem
                        key={item.league_id}
                        value={String(item.league_id)}
                      >
                        <div className="flex justify-between items-center p-3 border-b border-gray-200 relative">
                          <div className="flex flex-col items-center text-center mr-3">
                            <p className="font-bold text-gray-800 text-md">
                              {format(new Date(item.league_at), "HH:mm")}
                            </p>
                          </div>
                          <div className="flex flex-col flex-grow pl-3">
                            <div className="pl-2">
                              {renderLeagueTierBadge(item.required_tier)}
                              <div className="flex items-center gap-1 mb-1">
                                <p className="text-base font-semibold text-gray-900">
                                  {item.league_name}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>
                                  {item.match_type === "SINGLES"
                                    ? "단식"
                                    : "복식"}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span>
                                  {item.recruited_member_count} /{" "}
                                  {item.player_limit_count}명
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-center">
                            {renderLeagueStatusButton(item.league_status)}
                          </div>
                        </div>
                        <AccordionContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {matchMockData.map((match) => (
                              <div
                                key={match.id}
                                className="p-4 rounded-lg w-full flex flex-col justify-center items-center border border-solid border-gray-300 "
                              >
                                <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm">
                                  {match.stage}
                                </Badge>
                                <div className="flex items-center justify-between gap-6">
                                  <div className="flex items-center space-x-3">
                                    <SImage
                                      src={match.team1.profileImage}
                                      radius="circular"
                                      width={45}
                                      height={45}
                                      alt="profile"
                                    />
                                    <span className="text-gray-800 text-sm font-semibold">
                                      {match.team1.name}
                                    </span>
                                  </div>
                                  <span className="text-gray-900 font-bold text-lg">
                                    {match.team1.score} : {match.team2.score}
                                  </span>
                                  <div className="flex items-center space-x-3">
                                    <span className="text-gray-800 text-sm font-semibold">
                                      {match.team2.name}
                                    </span>
                                    <SImage
                                      src={match.team2.profileImage}
                                      radius="circular"
                                      width={45}
                                      height={45}
                                      alt="profile"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </Accordion>
        )}
      </div>
    </div>
  );
}
export default LiveMatchList;
