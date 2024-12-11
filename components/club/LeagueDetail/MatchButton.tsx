import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GetLeagueDetailData } from "@/types/leagueTypes";
import type { GetMemberSessionData } from "@/types/memberTypes";
import { BookUser } from "lucide-react";
import Link from "next/link";

interface MatchButtonProps {
  clubId: string;
  leagueId: string;
  league: GetLeagueDetailData;
  loginedUser: GetMemberSessionData;
  createMatch: () => void; // 대진표 생성 함수 타입 정의;
}

const MatchButton = ({
  leagueId,
  clubId,
  league,
  loginedUser,
  createMatch,
}: MatchButtonProps) => {
  const matchCreateCondition =
    (league.league_status === "RECRUITING_COMPLETED" ||
      league.league_status === "PLAYING") &&
    !league?.is_match_created;

  if (league.is_match_created) {
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
  }

  if (league?.league_owner_token === loginedUser.member_token) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="lg"
              variant="outline"
              className="items-center justify-center gap-2 border-primary w-1/3 hover:bg-white hover:text-primary"
              onClick={() => {
                if (matchCreateCondition) {
                  createMatch();
                }
              }}
            >
              <BookUser size={20} />
              대진표 생성
            </Button>
          </TooltipTrigger>
          {league.league_status !== "RECRUITING_COMPLETED" && (
            <TooltipContent>
              모집을 먼저 마감하고, 대진표를 만들어주세요
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  return null;
};

export default MatchButton;
