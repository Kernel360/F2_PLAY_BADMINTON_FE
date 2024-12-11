import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tier } from "@/types/commonTypes";
import type { GetLeagueDetailData } from "@/types/leagueTypes";
import type { GetMemberSessionResponse } from "@/types/memberTypes";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";

interface ParticipateButtonProps {
  league: GetLeagueDetailData;
  loginedUser: GetMemberSessionResponse;
  handleParticipate: (status: boolean) => void;
  isParticipating: boolean;
}

const canParticipate = (userTier: Tier, requiredTier: Tier): boolean => {
  if (userTier === "GOLD") {
    return true; // GOLD 티어는 모든 경기에 참가 가능
  }

  if (userTier === "SILVER") {
    return requiredTier === "SILVER" || requiredTier === "BRONZE";
    // SILVER 티어는 SILVER, BRONZE 경기에 참가 가능
  }

  if (userTier === "BRONZE") {
    return requiredTier === "BRONZE";
    // BRONZE 티어는 BRONZE 경기에만 참가 가능
  }

  // 위 조건에 해당하지 않는 경우 참가 불가
  return false;
};

function ParticipateButton({
  league,
  loginedUser,
  handleParticipate,
  isParticipating,
}: ParticipateButtonProps) {
  const router = useRouter();

  // 리그 생성자 여부 확인
  const isLeagueOwner =
    loginedUser?.data?.member_token === league.league_owner_token;

  // 모집 상태 확인 (RECRUITING 또는 RECRUITING_COMPLETED 상태 포함)
  const isRecruitingOrCompleted =
    league.league_status === "RECRUITING" ||
    league.league_status === "RECRUITING_COMPLETED";

  // 모집 인원 초과 여부 확인
  const isFull = league.recruited_member_count === league.player_limit_count;

  // 사용자 티어와 리그 티어 비교
  const canUserParticipate =
    loginedUser &&
    canParticipate(loginedUser?.data?.member_tier, league.required_tier);

  if (league.league_status === "CANCELED") {
    return null;
  }

  // 로그인 하지 않은 사용자 처리
  if (loginedUser.result === "FAIL") {
    return (
      <Button
        size="lg"
        variant="outline"
        className="items-center justify-center gap-2 border-primary w-1/3 hover:bg-white hover:text-primary"
        onClick={() => router.push("/login")}
      >
        <User size={20} />
        경기 참가
      </Button>
    );
  }

  // 경기 생성자 처리
  if (isLeagueOwner) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
      >
        경기 생성자는 참가 취소를 할 수 없습니다
      </Button>
    );
  }

  // 모집중 또는 모집 완료 상태가 아닌 경우 처리
  if (!isRecruitingOrCompleted) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
      >
        모집중인 경기가 아닙니다
      </Button>
    );
  }

  // 참여 신청 한 사람 처리
  if (isParticipating) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full sm:w-1/2 lg:w-1/3">
            <Button
              size="lg"
              variant="destructive"
              className="items-center justify-center gap-2 border-primary w-full"
              onClick={() => {
                if (league.league_status === "RECRUITING") {
                  handleParticipate(true);
                }
              }}
            >
              <User size={20} />
              참가 취소
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            모집 마감 전까지 경기 참여를 취소할 수 있습니다!
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // 지원할 수 있는 티어가 아닐 때 처리
  if (!canUserParticipate) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
      >
        지원할 수 있는 티어가 아닙니다
      </Button>
    );
  }

  // 모집 인원이 가득 찼을 때 처리
  if (isFull) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="cursor-not-allowed items-center justify-center gap-2 border-primary w-1/3 border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
      >
        모집 인원이 가득 찼습니다
      </Button>
    );
  }

  // 참가 신청 가능 버튼
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full sm:w-1/2 lg:w-1/3">
          <Button
            size="lg"
            variant="outline"
            className="items-center justify-center gap-2 border-primary w-1/3 hover:bg-white hover:text-primary"
            onClick={() => handleParticipate(false)}
          >
            <User size={20} />
            경기 참가
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          모집 마감 전까지 경기 참여를 할 수 있습니다!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ParticipateButton;
