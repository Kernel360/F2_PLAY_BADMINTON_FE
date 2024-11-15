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
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { format } from "date-fns";
import Link from "next/link";
import SImage from "../ui/Image";

const mockData = [
  {
    league_id: 1,
    league_name: "배드민턴 경기 1",
    league_description: "이 경기는 지역 예선 경기 1입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "SINGLES",
    league_at: "2024-11-01T09:00:00",
    recruiting_closed_at: "2024-10-22T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 16,
    recruited_member_count: 8,
    is_participated_in_league: true,
    created_at: "2024-10-01T08:00:00",
    modified_at: "2024-10-01T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 8,
    league_name: "배드민턴 경기 8",
    league_description: "이 경기는 지역 예선 경기 8입니다.",
    league_location: "양재 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "DOUBLES",
    league_at: "2024-11-01T09:30:00",
    recruiting_closed_at: "2024-10-29T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 23,
    recruited_member_count: 22,
    is_participated_in_league: false,
    created_at: "2024-10-08T08:00:00",
    modified_at: "2024-10-11T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 2,
    league_name: "배드민턴 경기 2",
    league_description: "이 경기는 지역 예선 경기 2입니다.",
    league_location: "양재 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "DOUBLES",
    league_at: "2024-11-01T10:30:00",
    recruiting_closed_at: "2024-10-23T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 17,
    recruited_member_count: 10,
    is_participated_in_league: false,
    created_at: "2024-10-02T08:00:00",
    modified_at: "2024-10-02T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 9,
    league_name: "배드민턴 경기 9",
    league_description: "이 경기는 지역 예선 경기 9입니다.",
    league_location: "장충동 체육관",
    required_tier: "BRONZE",
    league_status: "PLAYING",
    match_type: "SINGLES",
    league_at: "2024-11-01T12:00:00",
    recruiting_closed_at: "2024-10-30T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 24,
    recruited_member_count: 24,
    is_participated_in_league: true,
    created_at: "2024-10-09T08:00:00",
    modified_at: "2024-10-13T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 3,
    league_name: "배드민턴 경기 3",
    league_description: "이 경기는 지역 예선 경기 3입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "PLAYING",
    match_type: "SINGLES",
    league_at: "2024-11-01T13:00:00",
    recruiting_closed_at: "2024-10-24T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 18,
    recruited_member_count: 12,
    is_participated_in_league: true,
    created_at: "2024-10-03T08:00:00",
    modified_at: "2024-10-04T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 5,
    league_name: "배드민턴 경기 5",
    league_description: "이 경기는 지역 예선 경기 5입니다.",
    league_location: "장충동 체육관",
    required_tier: "SILVER",
    league_status: "COMPLETED",
    match_type: "SINGLES",
    league_at: "2024-11-01T15:30:00",
    recruiting_closed_at: "2024-10-26T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 20,
    recruited_member_count: 16,
    is_participated_in_league: true,
    created_at: "2024-10-05T08:00:00",
    modified_at: "2024-10-07T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 10,
    league_name: "배드민턴 경기 10",
    league_description: "이 경기는 지역 예선 경기 10입니다.",
    league_location: "양재 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T17:00:00",
    recruiting_closed_at: "2024-10-31T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 25,
    recruited_member_count: 26,
    is_participated_in_league: false,
    created_at: "2024-10-10T08:00:00",
    modified_at: "2024-10-14T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 6,
    league_name: "배드민턴 경기 6",
    league_description: "이 경기는 지역 예선 경기 6입니다.",
    league_location: "양재 체육관",
    required_tier: "BRONZE",
    league_status: "PLAYING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T18:00:00",
    recruiting_closed_at: "2024-10-27T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 21,
    recruited_member_count: 18,
    is_participated_in_league: false,
    created_at: "2024-10-06T08:00:00",
    modified_at: "2024-10-08T08:00:00",
    is_match_created: false,
  },
  {
    league_id: 7,
    league_name: "배드민턴 경기 7",
    league_description: "이 경기는 지역 예선 경기 7입니다.",
    league_location: "장충동 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "SINGLES",
    league_at: "2024-11-01T20:00:00",
    recruiting_closed_at: "2024-10-28T09:00:00",
    match_generation_type: "RANDOM",
    player_limit_count: 22,
    recruited_member_count: 20,
    is_participated_in_league: true,
    created_at: "2024-10-07T08:00:00",
    modified_at: "2024-10-10T08:00:00",
    is_match_created: true,
  },
  {
    league_id: 4,
    league_name: "배드민턴 경기 4",
    league_description: "이 경기는 지역 예선 경기 4입니다.",
    league_location: "양재 체육관",
    required_tier: "GOLD",
    league_status: "RECRUITING",
    match_type: "DOUBLES",
    league_at: "2024-11-01T20:00:00",
    recruiting_closed_at: "2024-10-25T09:00:00",
    match_generation_type: "TIER",
    player_limit_count: 19,
    recruited_member_count: 14,
    is_participated_in_league: false,
    created_at: "2024-10-04T08:00:00",
    modified_at: "2024-10-05T08:00:00",
    is_match_created: false,
  },
];

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

type LeagueStatus = "RECRUITING" | "COMPLETED" | "PLAYING" | string;
type LeagueTier = "GOLD" | "SILVER" | "BRONZE" | string;

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

  if (status === "COMPLETED") {
    return (
      <Button className="p-2 h-8 rounded-md text-xs w-[105px] border-0 bg-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-600 cursor-default">
        모집마감
      </Button>
    );
  }
};

const renderLeagueTierBadge = (tier: LeagueTier) => {
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
  const handleDateSelect = (date: Date) => {
    console.log("Selected date:", date);
  };

  return (
    <div className="p-4 w-full bg-white">
      <DateCarousel onDateSelect={handleDateSelect} />
      <div className="mt-3">
        <Accordion type="single" collapsible>
          {mockData.map((item) => (
            <AccordionItem key={item.league_id} value={String(item.league_id)}>
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
                        {item.match_type === "SINGLES" ? "단식" : "복식"}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>
                        {item.recruited_member_count} /{" "}
                        {item.player_limit_count}명
                      </span>

                      {item.is_participated_in_league && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-blue-500 font-medium">
                            참여 중
                          </span>
                        </>
                      )}
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
          ))}
        </Accordion>
      </div>
    </div>
  );
}
export default LiveMatchList;
