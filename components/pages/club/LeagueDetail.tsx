"use client";

import Spinner from "@/components/Spinner";
import LeagueInfo from "@/components/club/LeagueDetail/LeagueInfo";
import LeagueParticipant from "@/components/club/LeagueDetail/LeagueParticipant";
import MatchButton from "@/components/club/LeagueDetail/MatchButton";
import ParticipateButton from "@/components/club/LeagueDetail/ParticipateButton";
import RecruitmentInfoDialog from "@/components/club/LeagueDetail/RecruitmentInfoDialog";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

import {
  useDeleteLeague,
  useGetLeagueCheck,
  useGetLeagueDetail,
} from "@/lib/api/hooks/leagueHook";
import { usePostMatches } from "@/lib/api/hooks/matchHook";
import { useGetMembersSession } from "@/lib/api/hooks/memberHook";
import { getTierWithEmojiAndText } from "@/utils/getTier";
import { format } from "date-fns";
import {
  Award,
  Calendar,
  CalendarDays,
  Edit,
  Flag,
  GitCompare,
  MapPin,
  Pencil,
  Pyramid,
  TicketX,
  User,
  Users2Icon,
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

  const { mutate: deleteLeague } = useDeleteLeague(
    clubId as string,
    leagueId as string,
    () => alert("경기 취소가 완료되었습니다"),
  );
  const { mutate: createMatch } = usePostMatches(
    clubId as string,
    leagueId as string,
    () => router.push(`/club/${clubId}/league/${leagueId}/match`),
  );

  const cancelLeague = () => {
    if (confirm("정말로 경기를 취소하시겠습니까?")) {
      deleteLeague();
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto min-h-[530px] flex items-center justify-center bg-white rounded-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white rounded-lg p-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-4">
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
          loginedUser.data.member_token === league?.league_owner_token &&
          league?.league_status !== "CANCELED" && (
            <div className="flex flex-wrap gap-2">
              {league?.league_status === "RECRUITING" && (
                <RecruitmentInfoDialog
                  clubId={clubId as string}
                  leagueId={leagueId as string}
                />
              )}

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
                variant="outline"
                className="flex items-center gap-1 hover:bg-zinc-500 hover:text-white border-zinc-500 text-zinc-500"
                onClick={cancelLeague}
              >
                <TicketX size={16} />
                취소
              </Button>
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LeagueInfo
          icon={Calendar}
          label="경기 일자"
          value={
            league?.league_at &&
            format(new Date(league.league_at), "yyyy-MM-dd HH시 mm분")
          }
        />
        <LeagueInfo
          icon={Flag}
          label="모집 상태"
          value={getRecruitmentStatusLabel(league?.league_status || "")}
        />
        <LeagueInfo
          icon={MapPin}
          label="경기 장소"
          value={league?.full_address}
        />
        <LeagueInfo
          icon={User}
          label="모집 인원"
          value={`${league?.recruited_member_count} / ${league?.player_limit_count} 명`}
        />
        <LeagueInfo
          icon={Calendar}
          label="모집 마감 일자"
          value={
            league?.recruiting_closed_at &&
            format(
              new Date(league.recruiting_closed_at),
              "yyyy-MM-dd HH시 mm분",
            )
          }
        />
        <LeagueInfo
          icon={Award}
          label="지원 가능 티어"
          value={getTierWithEmojiAndText(league?.required_tier || "")}
        />
        <LeagueInfo
          icon={Pyramid}
          label="경기 유형"
          value={league?.match_type === "SINGLES" ? "단식" : "복식"}
        />
        <LeagueInfo
          icon={GitCompare}
          label="대진표 타입"
          value={league?.match_generation_type === "FREE" ? "프리" : "토너먼트"}
        />
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

      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Users2Icon className="text-gray-500" size={20} />
          경기 참여자
        </h3>
        <div className="mt-4 max-h-[400px] overflow-y-auto pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {league?.league_participants.map((participant) => (
              <LeagueParticipant
                key={participant.member_token}
                participant={participant}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly items-center gap-4 mt-8">
        {league && loginedUser?.data && (
          <MatchButton
            clubId={clubId as string}
            leagueId={leagueId as string}
            league={league}
            loginedUser={loginedUser?.data}
            createMatch={createMatch}
          />
        )}
        {league && loginedUser && (
          <ParticipateButton
            clubId={clubId as string}
            leagueId={leagueId as string}
            league={league}
            loginedUser={loginedUser?.data}
            isParticipating={!!leagueCheck?.data?.is_participated_in_league}
          />
        )}
      </div>
    </div>
  );
}

export default LeagueDetail;
