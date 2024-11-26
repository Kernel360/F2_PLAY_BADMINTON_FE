import { Button } from "@/components/ui/Button";
import type { GetLeagueDetailData } from "@/types/leagueTypes";
import { BookUser } from "lucide-react";
import Link from "next/link";

interface MatchButtonProps {
  clubId: string;
  leagueId: string;
  league: GetLeagueDetailData;
  createMatch: () => void; // 대진표 생성 함수 타입 정의;
}

const MatchButton = ({
  leagueId,
  clubId,
  league,
  createMatch,
}: MatchButtonProps) => {
  const matchCreateCondition =
    (league.league_status === "RECRUITING_COMPLETED" ||
      league.league_status === "PLAYING") &&
    !league?.is_match_created;

  if (matchCreateCondition) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="items-center justify-center gap-2 border-primary w-1/3 hover:bg-white hover:text-primary"
        onClick={createMatch}
      >
        <BookUser size={20} />
        대진표 생성
      </Button>
    );
  }

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

  return null;
};

export default MatchButton;
