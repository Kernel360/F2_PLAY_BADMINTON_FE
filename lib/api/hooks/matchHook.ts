import { getMatches, postMatches } from "@/lib/api/functions/matchFn";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type { GetMatchesData, PostMatchesData } from "@/types/matchTypes";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithToast from "./useMutationWithToast";

export const useGetMatches = (clubId: string, leagueId: number) => {
  return useQueryWithToast<GetMatchesData>(["matchesData"], () =>
    getMatches(clubId, leagueId),
  );
};

export const usePostMatches = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postMatches(clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["matchesData"] });
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    onSuccess();
  };
  return useMutationWithToast<PostMatchesData, void>(
    mutationFn,
    onSuccessCallback,
  );
};
