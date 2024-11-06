"use client";

import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  useGetMembersMatchesRecord,
  useGetMembersMyClubs,
  useGetMembersMyPage,
} from "@/lib/api/hooks/memberHook";
import type { GetMemberMachesRecordData } from "@/types/memberTypes";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { format } from "date-fns";
import {
  Camera,
  Edit,
  History,
  Inbox,
  Medal,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useState } from "react";
import EditProfileDialog from "./myPage/EditProfileDialog";

function MyPage() {
  const { data: myPage } = useGetMembersMyPage();
  const { data: myClubs } = useGetMembersMyClubs();
  const { data: matchRecord } = useGetMembersMatchesRecord();

  const getMatchDetails = (match: GetMemberMachesRecordData) => {
    const isSingles = match.match_type === "SINGLES";
    const opponentName = isSingles
      ? match.singles_match?.opponent_name || "알 수 없음"
      : `${match.doubles_match?.opponent_team?.participant1_name || "알 수 없음"}, ${match.doubles_match?.opponent_team?.participant2_name || "알 수 없음"}`;

    const matchTypeLabel = isSingles ? "단식" : "복식";
    const matchTypeStyles = isSingles ? "text-blue-600" : "text-green-600";

    let matchResult = "진행 중";
    let resultBadgeVariant:
      | "secondary"
      | "default"
      | "destructive"
      | "outline"
      | null
      | undefined = "outline";

    if (match.match_status === "FINISHED") {
      matchResult = isSingles
        ? match.singles_match?.current_player_result || "결과 없음"
        : match.doubles_match?.current_team_result || "결과 없음";

      resultBadgeVariant =
        matchResult === "WIN"
          ? "default"
          : matchResult === "LOSE"
            ? "destructive"
            : matchResult === "DRAW"
              ? "secondary"
              : "outline";
    }

    return {
      opponentName,
      matchTypeLabel,
      matchTypeStyles,
      matchResult,
      resultBadgeVariant,
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* 프로필 섹션 */}
      <div className="col-span-1 md:sticky top-8">
        <Card className="border p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 rounded-full mb-4 shadow-md">
              <AvatarImage src={myPage?.profile_image} alt="프로필" />
              <AvatarFallback />
            </Avatar>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {myPage?.name}
              </h2>
              <p className="text-sm text-gray-500">{myPage?.email}</p>
            </div>

            {/* 티어 배지 */}
            <div className="mt-3">
              <span className="text-xs font-semibold text-white bg-blue-500 px-3 py-1 rounded-full">
                티어: {getTierWithEmoji(myPage?.tier || "")}
              </span>
            </div>

            {myPage && (
              <EditProfileDialog
                initialName={myPage.name || ""}
                initialProfileImage={
                  myPage.profile_image || "/images/dummy-image.jpg"
                }
              />
            )}
          </div>

          {/* 전적 정보 */}
          <div className="mt-8 border-t pt-4">
            <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-4">
              <Medal className="text-yellow-500 h-5 w-5" /> 전적
            </Label>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-gray-600">총 경기</p>
                <span className="text-lg font-bold text-gray-900">
                  {myPage?.league_record_response?.match_count || 0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-primary">승리</p>
                <span className="text-lg font-bold text-primary">
                  {myPage?.league_record_response?.win_count || 0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-gray-500">무승부</p>
                <span className="text-lg font-bold text-gray-500">
                  {myPage?.league_record_response?.draw_count || 0}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-red-600">패배</p>
                <span className="text-lg font-bold text-red-600">
                  {myPage?.league_record_response?.lose_count || 0}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="col-span-2 flex flex-col gap-4">
        <Card className="border rounded-lg flex flex-col h-[45vh]">
          <CardHeader className="border-b py-3 px-6">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Users className="text-blue-500 h-5 w-5" /> 내가 가입한 동호회
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {myClubs?.length ? (
              myClubs.map((club) => (
                <Link
                  href={`/club/${club.club_token}`}
                  key={club.club_token}
                  className="flex items-center border-b p-3 last:border-0 cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-md"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-full overflow-hidden mr-4 bg-gray-100 shadow-sm">
                    <img
                      src={club.club_image || "/images/dummy-image.jpg"}
                      alt={club.club_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {club.club_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 w-full">
                      {club.club_description &&
                      club.club_description?.length > 50
                        ? `${club.club_description.substring(0, 50)}...`
                        : club.club_description}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                <Inbox className="h-8 w-8 mb-2" />
                <p>가입한 동호회가 없습니다</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 경기 결과 */}
        <Card className="border rounded-lg flex flex-col h-[45vh]">
          <CardHeader className="border-b py-3 px-6">
            <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Trophy className="text-yellow-500 h-5 w-5" /> 경기 결과
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {matchRecord?.length ? (
              matchRecord.map((match) => {
                const {
                  opponentName,
                  matchTypeLabel,
                  matchTypeStyles,
                  matchResult,
                  resultBadgeVariant,
                } = getMatchDetails(match);

                return (
                  <div
                    key={match.match_id}
                    className="flex flex-col border-b p-4 last:border-0"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1 h-4 ${matchTypeLabel === "단식" ? "bg-blue-500" : "bg-green-500"} rounded-full`}
                        />
                        <span
                          className={`font-semibold text-sm ${matchTypeStyles}`}
                        >
                          {matchTypeLabel}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-700 gap-1">
                        <User
                          className="text-gray-500 h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium truncate">
                          {opponentName}
                        </span>
                      </div>

                      <Badge
                        variant={resultBadgeVariant}
                        className="text-sm rounded-full"
                      >
                        {matchResult}
                      </Badge>

                      <span className="text-sm text-gray-500">
                        {match.league_at &&
                          format(new Date(match.league_at), "yyyy년 MM월 dd일")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <History className="h-8 w-8 mb-2" />
                <p>기록된 경기 결과가 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MyPage;
