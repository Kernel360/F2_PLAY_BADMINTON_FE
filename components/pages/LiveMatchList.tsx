"use client";

import DateCarousel from "@/components/DayCarousel";
import MainBannerCarousel from "@/components/MainBannerCarousel";
import Spinner from "@/components/Spinner";
import LeagueStatusButton from "@/components/liveMatch/LeagueStatusButton";
import LeagueTierBadge from "@/components/liveMatch/TierBadge";
import { Button } from "@/components/ui/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  useGetMainLeagues,
  useGetMainLeaguesMatch,
} from "@/lib/api/hooks/mainLeagueHook";
import type {
  GetMainLeagues,
  GetMainLeaguesMatchData,
} from "@/types/mainLeagueTypes";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import LiveMatchCard from "../club/LiveMatchAccordion/LiveMatchCard";

function LiveMatchList() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [openedLeagueId, setOpenedLeagueId] = useState<string | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetMainLeagues({
    leagueStatus: "ALL",
    region: "ALL",
    date: selectedDate,
    size: 9,
  });

  const { data: leagueDetails } = useGetMainLeaguesMatch(openedLeagueId);

  const handleAccordionChange = (leagueId: string) => {
    setOpenedLeagueId(leagueId); // 아코디언 열림 상태 업데이트
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate); // 상태 업데이트
  };

  return (
    <>
      <MainBannerCarousel />
      <div className="p-4 w-full bg-white">
        <DateCarousel onDateSelect={handleDateSelect} />
        <div className="mt-3 min-h-[50vh]">
          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : data.length === 0 ? (
            <div className="w-full min-h-[25vh] col-span-1 sm:col-span-2 lg:col-span-3  flex flex-col justify-center items-center gap-2 text-black">
              <img src="/images/logo.png" alt="logo" className="w-24 h-24" />
              예정된 경기가 없습니다
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              onValueChange={(value) => handleAccordionChange(value)}
            >
              {data.map((item: GetMainLeagues) => {
                return (
                  <AccordionItem
                    key={item.league_id}
                    value={String(item.league_id)}
                  >
                    <div className="flex justify-between items-center p-3 border-b border-gray-200 relative">
                      <Link
                        href={`/club/${item.club_token}/league/${item.league_id}`}
                        className="flex flex-grow items-center gap-3 text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col items-center text-center mr-3">
                          <p className="font-bold text-gray-800 text-md">
                            {format(new Date(item.league_at), "HH:mm")}
                          </p>
                        </div>
                        <div className="flex flex-col flex-grow pl-3 gap-1">
                          <LeagueTierBadge tier={item.required_tier} />
                          <div className="flex items-center my-1 pl-1">
                            <p className="text-base font-semibold text-gray-900">
                              {item.league_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 pl-1">
                            <span>
                              {item.match_type === "SINGLES" ? "단식" : "복식"}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>
                              {item.recruited_member_count} /{" "}
                              {item.player_limit_count}명
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center">
                        <LeagueStatusButton
                          status={item.league_status}
                          clubToken={item.club_token}
                          leagueId={item.league_id}
                        />
                      </div>
                    </div>
                    <AccordionContent>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {leagueDetails?.length === 0 ? (
                          <div className="w-full h-20 col-span-1 sm:col-span-2 lg:col-span-3  flex flex-col justify-center items-center gap-2 text-black">
                            <img
                              src="/images/logo.png"
                              alt="logo"
                              className="w-12 h-12"
                            />
                            아직 진행중인 경기가 없습니다
                          </div>
                        ) : (
                          leagueDetails?.map(
                            (match: GetMainLeaguesMatchData) => (
                              <LiveMatchCard
                                key={match.match_id}
                                match={match}
                              />
                            ),
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
        {hasNextPage && (
          <div className="w-full flex justify-center items-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              className="mt-4 px-6 py-2 font-semibold rounded-lg duration-300 shadow-md hover:shadow-lg focus:ring-2"
            >
              더보기
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default LiveMatchList;
