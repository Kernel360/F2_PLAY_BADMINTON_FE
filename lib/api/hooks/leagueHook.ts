import type { components } from "@/schemas/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMonthLeagues, postLeagues } from "../functions/leagueFn";

type LeagueCreateRequest = components["schemas"]["LeagueCreateRequest"];

export const usePostLeagues = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leagueData: LeagueCreateRequest) =>
      postLeagues(leagueData, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaguesData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const useGetMonthLeagues = (clubId: number, date: string) => {
  return useQuery({
    queryKey: ["leaguesData"],
    queryFn: () => getMonthLeagues(clubId, date),
  });
};
