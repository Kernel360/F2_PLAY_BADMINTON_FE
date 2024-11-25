"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useGetClubMembersCheck } from "@/lib/api/hooks/clubMemberHook";
import {
  useDeleteLeague,
  useDeleteParticipantLeague,
  useGetLeagueCheck,
  useGetLeagueDetail,
  usePostParticipantLeague,
} from "@/lib/api/hooks/leagueHook";
import { usePostMatches } from "@/lib/api/hooks/matchHook";
import { useGetMembersSession } from "@/lib/api/hooks/memberHook";
import type { Tier } from "@/types/commonTypes";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { format } from "date-fns";
import {
  Award,
  BookUser,
  Calendar,
  CalendarDays,
  Edit,
  Flag,
  GitCompare,
  MapPin,
  Pencil,
  Pyramid,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const getRecruitmentStatusLabel = (status: string) => {
  switch (status) {
    case "RECRUITING":
      return "모집 중";
    case "RECRUITING_COMPLETED":
      return "모집 완료";
    case "PLAYING":
      return "경기중";
    case "CANCELED":
      return "경기 취소";
    case "FINISHED":
      return "경기 종료";
    default:
      return status;
  }
};

const canParticipate = (userTier: Tier, targetTier: Tier): boolean => {
  if (userTier === "GOLD") {
    return true;
  }

  if (userTier === "SILVER" && targetTier === "SILVER") {
    return true;
  }

  // BRONZE는 BRONZE 경기에만 참가할 수 있음
  if (userTier === "BRONZE" && targetTier === "BRONZE") {
    return true;
  }

  // 나머지 경우는 참가할 수 없음
  return false;
};

function LeagueDetail() {
  const { clubId, leagueId } = useParams();
  const router = useRouter();
  const { data: league, isLoading } = useGetLeagueDetail(
    clubId as string,
    leagueId as string,
  );
  const { data: loginedUser } = useGetMembersSession();
  const { data: leagueCheck } = useGetLeagueCheck(
    clubId as string,
    leagueId as string,
  );
  const { data: clubMemberCheck } = useGetClubMembersCheck(clubId as string);
  const { mutate: postParticipate } = usePostParticipantLeague(
    clubId as string,
    leagueId as string,
    () => alert("경기 신청이 완료되었습니다"),
  );
  const { mutate: deleteParticipate } = useDeleteParticipantLeague(
    clubId as string,
    leagueId as string,
    () => alert("경기 신청 취소가 완료되었습니다"),
  );
  const { mutate: deleteLeague } = useDeleteLeague(
    clubId as string,
    leagueId as string,
  );
  const { mutate: createMatch } = usePostMatches(
    clubId as string,
    leagueId as string,
  );
  const { data: sessionData } = useGetMembersSession();

  const handleParticipate = (status: boolean) => {
    const isParticipate = !!leagueCheck?.data?.is_participated_in_league;
    if (sessionData?.result === "FAIL") {
      alert("로그인이 필요한 기능입니다");
      return router.push("/login");
    }

    if (!clubMemberCheck?.data?.is_club_member) {
      alert("동호회 가입이 필요합니다");
      return router.push(`/club/${clubId}`);
    }

    if (!status) {
      postParticipate();
    } else {
      deleteParticipate();
    }
  };

  const renderButtonByMatchCreatedStatus = () => {
    if (league?.player_limit_count !== league?.recruited_member_count) {
      return null;
    }

    if (!league?.is_match_created) {
      return (
        <Button
          size="lg"
          variant="outline"
          className="items-center justify-center gap-2 border-primary w-1/3 hover:bg-white hover:text-primary"
          onClick={() =>
            createMatch(undefined, {
              onSuccess: () =>
                router.push(`/club/${clubId}/league/${leagueId}/match`),
            })
          }
        >
          <BookUser size={20} />
          대진표 생성
        </Button>
      );
    }

    return (
      <Link
        href={`/club/${clubId}/league/${leagueId}/match`}
        className="flex justify-center items-center gap-4 w-1/3"
      >
        <Button
          size="lg"
          variant="outline"
          className="items-center justify-center gap-2 border-primary w-full"
        >
          <BookUser size={20} />
          대진표 보기
        </Button>
      </Link>
    );
  };

  const renderParticipateButton = () => {
    // league owner 인 경우 참가 버튼 x
    if (
      !!loginedUser?.data &&
      loginedUser.data.member_token === league?.league_owner_token
    )
      return (
        <Button
          size="lg"
          variant="outline"
          className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
        >
          경기 생성자는 참가 취소를 할 수 없습니다
        </Button>
      );

    // 모집중이 아닌 경우 참가 버튼 x
    if (league?.league_status !== "RECRUITING")
      return (
        <Button
          size="lg"
          variant="outline"
          className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
        >
          모집중인 경기가 아닙니다
        </Button>
      );

    // 자신의 티어보다 높은 경기는 참가 버튼 x
    if (
      !!loginedUser?.data &&
      !canParticipate(loginedUser.data.member_tier, league.required_tier)
    )
      return (
        <Button
          size="lg"
          variant="outline"
          className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
        >
          참가 티어가 너무 높습니다
        </Button>
      );

    if (league.recruited_member_count === league.player_limit_count) {
      return (
        <Button
          size="lg"
          variant="destructive"
          className="items-center justify-center gap-2 border-primary w-1/3"
          onClick={() => handleParticipate(true)}
        >
          <User size={20} />
          참가취소
        </Button>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto  min-h-[530px] flex items-center justify-center bg-white rounded-lg space-y-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white rounded-lg space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {league?.league_name}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <CalendarDays size={16} />
            <Text size="sm">
              {league?.created_at &&
                format(new Date(league.created_at), "yyyy년 MM월 dd일")}
            </Text>
          </div>
        </div>
        {!!loginedUser?.data &&
          loginedUser.data.member_token === league?.league_owner_token && (
            <div className="flex justify-center gap-2">
              <Link href={`/club/${clubId}/league/${leagueId}/update`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 border-primary"
                >
                  <Pencil size={16} />
                  수정
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                className="flex items-center gap-1"
                onClick={() => deleteLeague()}
              >
                <Trash2 size={16} />
                삭제
              </Button>
            </div>
          )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Calendar className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">경기 일자</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.league_at &&
                format(new Date(league.league_at), "yyyy-MM-dd HH시 mm분")}
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Flag className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 상태</p>
            <p className="text-sm font-semibold text-gray-800">
              {getRecruitmentStatusLabel(league?.league_status || "")}
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <MapPin className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">경기 장소</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.region}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <User className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 인원</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.recruited_member_count} / {league?.player_limit_count} 명
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Calendar className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 마감 일자</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.recruiting_closed_at &&
                format(new Date(league.recruiting_closed_at), "yyyy-MM-dd")}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Award className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">지원 티어</p>
            <p className="text-sm font-semibold text-gray-800">
              {getTierWithEmojiAndText(league?.required_tier || "")}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Pyramid className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">경기 유형</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.match_type === "SINGLES" ? "단식" : "복식"}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <GitCompare className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">대진표 타입</p>
            <p className="text-sm font-semibold text-gray-800">
              {league?.match_generation_type === "FREE" ? "프리" : "토너먼트"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Edit className="text-gray-500" size={20} />
          경기 소개
        </h3>
        <div className="mt-5">
          <Text color="black">{league?.league_description || "설명 없음"}</Text>
        </div>
      </div>
      <div className="flex w-full justify-evenly items-center mt-8">
        {renderButtonByMatchCreatedStatus()}

        {renderParticipateButton()}
      </div>
    </div>
  );
}

export default LeagueDetail;
