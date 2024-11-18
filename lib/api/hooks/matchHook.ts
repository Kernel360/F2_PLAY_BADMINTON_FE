import { getMatches, postMatches } from "@/lib/api/functions/matchFn";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type { GetMatchesData } from "@/types/matchTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMatches = (clubId: string, leagueId: number) => {
  return useQueryWithToast<GetMatchesData>(["matchesData"], () =>
    getMatches(clubId, leagueId),
  );
};

export const usePostMatches = (clubId: string, leagueId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postMatches(clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchesData"] });
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
};
