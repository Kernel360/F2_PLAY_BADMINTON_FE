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
  }
  if (userTier === "BRONZE") {
    return requiredTier === "BRONZE";
  }
  return false;
};

function ParticipateButton({
  league,
  loginedUser,
  handleParticipate,
  isParticipating,
}: ParticipateButtonProps) {
  const router = useRouter();

  const isLeagueOwner =
    loginedUser?.data?.member_token === league.league_owner_token;
  const isRecruitingOrCompleted =
    league.league_status === "RECRUITING" ||
    league.league_status === "RECRUITING_COMPLETED";
  const isFull = league.recruited_member_count === league.player_limit_count;
  const canUserParticipate =
    loginedUser &&
    canParticipate(loginedUser?.data?.member_tier, league.required_tier);

  const buttonClass =
    "items-center justify-center gap-2 border-primary w-full sm:w-1/2 lg:w-1/3";

  if (league.league_status === "CANCELED") return null;

  if (isFull) {
    return (
      <Button
        size="lg"
        variant="outline"
        className={`cursor-not-allowed ${buttonClass} border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500`}
      >
        모집 인원이 가득 찼습니다
      </Button>
    );
  }

  if (loginedUser.result === "FAIL") {
    return (
      <Button
        size="lg"
        variant="outline"
        className={`${buttonClass} hover:bg-white hover:text-primary`}
        onClick={() => router.push("/login")}
      >
        <User size={20} />
        경기 참가
      </Button>
    );
  }

  if (isLeagueOwner) {
    return (
      <Button
        size="lg"
        variant="outline"
        className={`cursor-not-allowed ${buttonClass} border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500`}
      >
        경기 생성자는 참가 취소를 할 수 없습니다
      </Button>
    );
  }

  if (!isRecruitingOrCompleted) {
    return (
      <Button
        size="lg"
        variant="outline"
        className={`cursor-not-allowed ${buttonClass} border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500`}
      >
        모집중인 경기가 아닙니다
      </Button>
    );
  }

  if (isParticipating) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={buttonClass}>
            <Button
              size="lg"
              variant="destructive"
              className={`${buttonClass} border-primary`}
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

  if (!canUserParticipate) {
    return (
      <Button
        size="lg"
        variant="outline"
        className={`cursor-not-allowed ${buttonClass} border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500`}
      >
        지원할 수 있는 티어가 아닙니다
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={buttonClass}>
          <Button
            size="lg"
            variant="outline"
            className={`${buttonClass} hover:bg-white hover:text-primary`}
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
