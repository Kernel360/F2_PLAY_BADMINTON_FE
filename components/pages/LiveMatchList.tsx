"use client";

import DateCarousel from "@/components/DayCarousel";
import MainBannerCarousel from "@/components/MainBannerCarousel";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/Button";
import SImage from "@/components/ui/Image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import LeagueStatusButton from "../liveMatch/LeagueStatusButton";
import LeagueTierBadge from "../liveMatch/TierBadge";

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

  const { data: leagueDetails } = useGetMainLeaguesMatch(
    openedLeagueId as string,
  );

  const handleAccordionChange = (leagueId: string | null) => {
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
          ) : (
            <Accordion
              type="single"
              collapsible
              onValueChange={(value) => handleAccordionChange(value)}
            >
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
                              {leagueDetails?.data?.length === 0 ? (
                                <div className="w-full h-20 col-span-1 sm:col-span-2 lg:col-span-3  flex flex-col justify-center items-center gap-2 text-black">
                                  <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="w-12 h-12"
                                  />
                                  아직 진행중인 경기가 없습니다
                                </div>
                              ) : (
                                leagueDetails?.data?.map(
                                  (match: GetMainLeaguesMatchData) => (
                                    <div
                                      key={match.match_id}
                                      className="gap-6 p-4 rounded-lg w-full flex flex-col justify-center items-center border border-solid border-gray-300"
                                    >
                                      <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center rounded-sm">
                                        {`${match.round_number}라운드 -  ${match.set_number}세트`}
                                      </Badge>
                                      <div className="flex flex-col gap-4 w-full">
                                        {/* 단식 */}
                                        {match.singles_match_player_response && (
                                          <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center space-x-3">
                                              <SImage
                                                src={
                                                  match
                                                    .singles_match_player_response
                                                    .participant1_image ||
                                                  "/images/dummy-image.jpg"
                                                }
                                                radius="circular"
                                                width={45}
                                                height={45}
                                                alt="profile"
                                              />
                                              <span className="text-gray-800 text-sm font-semibold truncate">
                                                {
                                                  match
                                                    .singles_match_player_response
                                                    .participant1_name
                                                }
                                              </span>
                                            </div>
                                            <span className="text-gray-900 font-bold text-lg">
                                              {match.set_score1} :{" "}
                                              {match.set_score2}
                                            </span>
                                            <div className="flex items-center space-x-3">
                                              <span className="text-gray-800 text-sm font-semibold ">
                                                {
                                                  match
                                                    .singles_match_player_response
                                                    .participant2_name
                                                }
                                              </span>
                                              <SImage
                                                src={
                                                  match
                                                    .singles_match_player_response
                                                    .participant2_image ||
                                                  "/images/dummy-image.jpg"
                                                }
                                                radius="circular"
                                                width={45}
                                                height={45}
                                                alt="profile"
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {/* 복식 */}
                                        {match.doubles_match_player_response &&
                                          leagueDetails.data?.length !== 0 && (
                                            <div className="flex flex-col gap-8">
                                              <div className="flex flex-col items-center gap-6">
                                                <div className="w-full flex flex-wrap justify-center gap-4">
                                                  <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                                                    <SImage
                                                      src={
                                                        match
                                                          .doubles_match_player_response
                                                          ?.participant1_image ||
                                                        "/images/dummy-image.jpg"
                                                      }
                                                      radius="circular"
                                                      width={50}
                                                      height={50}
                                                      alt={
                                                        match
                                                          .doubles_match_player_response
                                                          .participant1_name
                                                      }
                                                    />
                                                    <span className="text-gray-800 text-sm font-semibold truncate">
                                                      {
                                                        match
                                                          .doubles_match_player_response
                                                          .participant1_name
                                                      }
                                                    </span>
                                                  </div>
                                                  <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                                                    <SImage
                                                      src={
                                                        match
                                                          .doubles_match_player_response
                                                          ?.participant2_image ||
                                                        "/images/dummy-image.jpg"
                                                      }
                                                      radius="circular"
                                                      width={50}
                                                      height={50}
                                                      alt={
                                                        match
                                                          .doubles_match_player_response
                                                          .participant2_name
                                                      }
                                                    />
                                                    <span className="text-gray-800 text-sm font-semibold truncate">
                                                      {
                                                        match
                                                          .doubles_match_player_response
                                                          .participant2_name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="w-full flex flex-col items-center justify-center gap-2 text-xl font-semibold text-gray-900">
                                                  <span>
                                                    {match.set_score1}
                                                  </span>
                                                  <Separator />
                                                  <span>
                                                    {match.set_score2}
                                                  </span>
                                                </div>
                                              </div>

                                              <div className="flex flex-col items-center gap-6">
                                                <div className="w-full flex flex-wrap justify-center gap-4">
                                                  <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                                                    <SImage
                                                      src={
                                                        match
                                                          .doubles_match_player_response
                                                          ?.participant3_image ||
                                                        "/images/dummy-image.jpg"
                                                      }
                                                      radius="circular"
                                                      width={50}
                                                      height={50}
                                                      alt={
                                                        match
                                                          .doubles_match_player_response
                                                          .participant3_name
                                                      }
                                                    />
                                                    <span className="text-gray-800 text-sm font-semibold truncate">
                                                      {
                                                        match
                                                          .doubles_match_player_response
                                                          .participant3_name
                                                      }
                                                    </span>
                                                  </div>
                                                  <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
                                                    <SImage
                                                      src={
                                                        match
                                                          .doubles_match_player_response
                                                          ?.participant4_image ||
                                                        "/images/dummy-image.jpg"
                                                      }
                                                      radius="circular"
                                                      width={50}
                                                      height={50}
                                                      alt={
                                                        match
                                                          .doubles_match_player_response
                                                          .participant4_name
                                                      }
                                                    />
                                                    <span className="text-gray-800 text-sm font-semibold truncate">
                                                      {
                                                        match
                                                          .doubles_match_player_response
                                                          .participant4_name
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  ),
                                )
                              )}
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
