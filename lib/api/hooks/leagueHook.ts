import type { components } from "@/schemas/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLeagues } from "../functions/leagueFn";

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
