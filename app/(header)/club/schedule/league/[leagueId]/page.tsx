"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface League {
  leagueName: string;
  description: string;
  tierLimit: "GOLD" | "SILVER" | "BRONZE";
  status: "OPEN" | "CLOSED";
  matchType: "SINGLE" | "DOUBLES";
  leagueAt: string;
  closedAt: string;
  playerCount: number;
  createdAt: string;
  modifiedAt: string;
  matchingRequirement: string;
}

const sampleLeague: League = {
  leagueName: "example",
  description: "description",
  tierLimit: "GOLD",
  status: "OPEN",
  matchType: "SINGLE",
  leagueAt: "2024-09-30T05:53:45.509Z",
  closedAt: "2024-09-30T05:53:45.509Z",
  playerCount: 10,
  createdAt: "2024-09-30T05:53:45.509Z",
  modifiedAt: "2024-09-30T05:53:45.509Z",
  matchingRequirement: "TIER",
};

function LeaguePage() {
  // TODO(iamgyu): 서버에서 데이터 받아오기
  const league = sampleLeague;
  const [makeLeagueBtn, setMakeLeagueBtn] = useState(true);

  return (
    <>
      <div className="relative flex justify-center items-center w-full py-5">
        <h2>{league.leagueName}</h2>
        <div className="absolute right-0 flex gap-2 ml-auto">
          <Button size="sm" className="bg-red-500 hover:bg-red-500/80">
            삭제
          </Button>
          <Button size="sm" variant="outline" className="border-primary">
            수정
          </Button>
          <Button size="sm">참가</Button>
        </div>
      </div>
      <Textarea className="border-black border-2 resize-none">
        {league.description}
      </Textarea>
      <div className="flex gap-4 w-full">
        <span className="flex justify-center w-1/2 px-4 border-2 border-black rounded-md">
          {league.leagueAt}
        </span>
        <span className="flex justify-center w-1/2 px-4 border-2 border-black rounded-md">
          장소
        </span>
      </div>
      <div className="flex justify-center w-full px-4 border-2 border-black rounded-md">
        {league.tierLimit}
      </div>
      <div className="flex justify-center w-full px-4 border-2 border-black rounded-md">
        {league.closedAt}
      </div>
      <div className="flex justify-center w-full px-4 border-2 border-black rounded-md">
        {league.playerCount}
      </div>
      <div className="flex justify-center w-full px-4 border-2 border-black rounded-md">
        {league.matchType}
      </div>
      <div className="flex w-full overflow-x-scroll border-2 border-black rounded-md">
        {makeLeagueBtn ? (
          <Button
            className="w-full h-full rounded-none"
            onClick={() => {
              setMakeLeagueBtn(false);
            }}
          >
            경기 생성
          </Button>
        ) : (
          <div className="flex px-4 py-2 gap-2">
            {/* TODO(iamgyu): API 연동시 index 대신 id로 수정
              {Array.from({ length: 10 }, (_, index) => (
                <OneGameInfo key={index} />
              ))} */}
          </div>
        )}
      </div>
      <div>
        <p>경기결과</p>
        <div className="flex flex-col overflow-y-scroll items-center w-full h-16 px-4 py-2 border-2 border-black rounded-md gap-2">
          {/* TODO(iamgyu): API 연동시 index 대신 id로 수정
            {Array.from({ length: 10 }, (_, index) => (
              <OneGameResult key={index} />
            ))} */}
        </div>
      </div>
    </>
  );
}

export default LeaguePage;
