import useInfiniteQueryReturnFlattenData from "@/lib/api/hooks/useInfiniteQueryReturnFlattenData";
import type {
  GetMainLeagues,
  GetMainLeaguesMatchData,
} from "@/types/mainLeagueTypes";
import { getMainLeague, getMainLeagueMatch } from "../functions/mainLeagueFn";
import useQueryWithToast from "./useQueryWithToast";

export const useGetMainLeagues = ({
  leagueStatus,
  region,
  date,
  size,
}: {
  leagueStatus: "ALL" | "RECRUITING" | "PLAYING";
  region: "ALL";
  date: string;
  size: number;
}) => {
  return useInfiniteQueryReturnFlattenData<GetMainLeagues>(
    ["mainLeaguesList", leagueStatus, region, date, size],
    ({ pageParam }) =>
      getMainLeague({ pageParam, leagueStatus, region, date, size }),
    0,
  );
};

export const useGetMainLeaguesMatch = (leagueId: string | null) => {
  return useQueryWithToast<GetMainLeaguesMatchData[]>(
    ["leagueDetails", leagueId ?? ""],
    () => getMainLeagueMatch(leagueId ?? ""),
    {
      enabled: !!leagueId,
      refetchInterval: 5000, // 5초마다 재요청
    },
  );
};
