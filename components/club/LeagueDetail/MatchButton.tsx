import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePostMatches } from "@/lib/api/hooks/matchHook";
import type { GetLeagueDetailData } from "@/types/leagueTypes";
import type { GetMemberSessionData } from "@/types/memberTypes";
import { BookUser } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface MatchButtonProps {
  clubId: string;
  leagueId: string;
  league: GetLeagueDetailData;
  loginedUser: GetMemberSessionData;
}

const MatchButton = ({
  leagueId,
  clubId,
  league,
  loginedUser,
}: MatchButtonProps) => {
  const router = useRouter();
  const { matchId } = useParams();

  const matchCreateCondition =
    (league.league_status === "RECRUITING_COMPLETED" ||
      league.league_status === "PLAYING") &&
    !league?.is_match_created;

  const createMatchOnSuccess = () => {
    router.push(`/club/${clubId}/league/${leagueId}/match`);
  };

  const { mutate: createMatch } = usePostMatches(
    clubId,
    leagueId,
    matchId as string,
    () => createMatchOnSuccess(),
  );

  if (league.is_match_created) {
    return (
      <Link
        href={`/club/${clubId}/league/${leagueId}/match`}
        className="flex justify-center items-center gap-4 w-full sm:w-1/2 lg:w-1/3"
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
          <TooltipTrigger className="w-full sm:w-1/2 lg:w-1/3">
            <Button
              size="lg"
              variant="outline"
              className={`items-center justify-center gap-2 w-full 
                ${
                  matchCreateCondition
                    ? "border-primary hover:bg-white hover:text-primary"
                    : "cursor-not-allowed border-zinc-300 text-zinc-500 hover:bg-white hover:text-zinc-500"
                }`}
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
            <TooltipContent className="text-sm text-gray-700">
              모집을 먼저 마감하고, 대진표를 만들어주세요.
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  return null;
};

export default MatchButton;
