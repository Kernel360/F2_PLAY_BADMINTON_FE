import type { GetMainLeaguesResponse } from "@/types/mainLeagueTypes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMainLeague, getMainLeagueMatch } from "../functions/mainLeagueFn";

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
  return useInfiniteQuery<GetMainLeaguesResponse>({
    queryKey: ["mainLeaguesList", leagueStatus, region, date, size],
    queryFn: ({ pageParam }) =>
      getMainLeague({ pageParam, leagueStatus, region, date, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage?.data?.last ? pages.length : null;
    },
  });
};

export const useGetMainLeaguesMatch = (leagueId: string) => {
  return useQuery({
    queryKey: ["leagueDetails", leagueId],
    queryFn: () => getMainLeagueMatch(leagueId),
    enabled: !!leagueId,
    refetchInterval: 5000, // 5초마다 재요청
  });
};
