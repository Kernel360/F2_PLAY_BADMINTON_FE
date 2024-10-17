"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import {
  useDeleteParticipateLeague,
  useGetLeagueDetail,
  usePostParticipateLeague,
} from "@/lib/api/hooks/leagueHook";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { format } from "date-fns";
import {
  Award,
  BookUser,
  Calendar,
  CalendarDays,
  Edit,
  Flag,
  MapPin,
  Pencil,
  Pyramid,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeaguePage() {
  const pathname = usePathname();
  const clubId = Number(pathname.split("/")[2]);
  const leagueId = Number(pathname.split("/")[4]);
  const {
    data: league,
    isLoading,
    error,
  } = useGetLeagueDetail(clubId, leagueId);
  const { mutate: postParticipate } = usePostParticipateLeague(
    clubId,
    leagueId,
  );
  const { mutate: deleteParticipate } = useDeleteParticipateLeague(
    clubId,
    leagueId,
  );

  const handleParticipate = (isParticipate: boolean) => {
    if (!isParticipate) {
      postParticipate(undefined, {
        onSuccess: () => alert("경기 신청이 완료되었습니다"),
      });
    } else {
      deleteParticipate(undefined, {
        onSuccess: () => alert("경기 신청 취소가 완료되었습니다"),
      });
    }
  };

  const getRecruitmentStatusLabel = (status: string) => {
    switch (status) {
      case "RECRUITING":
        return "모집 중";
      case "COMPLETED":
        return "모집 완료";
      case "CANCELED":
        return "경기 취소";
      default:
        return status;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
        <div className="flex justify-center gap-2">
          <Link href={`/club/${clubId}/schedule/${leagueId}/update`}>
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
          >
            <Trash2 size={16} />
            삭제
          </Button>
        </div>
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
              {league?.league_location}
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
              {getTierWithEmoji(league?.required_tier || "")}
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
        <Link
          href={`/club/${clubId}/schedule/${leagueId}/match`}
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
        {/* TODO(Yejin0O0): 지원 가능한 티어 경기에만 버튼 보이도록 수정 */}
        {league?.league_status === "RECRUITING" && (
          <Button
            size="lg"
            variant={
              league?.is_participated_in_league ? "destructive" : "default"
            }
            className="items-center justify-center gap-2 border-primary w-1/3"
            onClick={() =>
              handleParticipate(!!league?.is_participated_in_league)
            }
          >
            <User size={20} />
            {league?.is_participated_in_league ? "참가 취소" : "참가하기"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default LeaguePage;
