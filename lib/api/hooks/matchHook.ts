import {
  getMatches,
  getSetScore,
  getSetsDetail,
  patchSetScore,
  postMatchStart,
  postMatches,
} from "@/lib/api/functions/matchFn";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  GetMatchesData,
  GetSetsDetailData,
  MatchStatus,
  PatchMatchSetScoreData,
  PatchMatchSetScoreRequest,
  PatchMatchSetScoreResponse,
  PostMatchStartData,
  PostMatchesData,
} from "@/types/matchTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useMutationWithToast from "./useMutationWithToast";

export const useGetMatches = (clubId: string, leagueId: number) => {
  return useQueryWithToast<GetMatchesData>(["matchesData"], () =>
    getMatches(clubId, leagueId),
  );
};

export const useGetSetsDetail = (
  clubId: string,
  leagueId: string,
  matchId: string,
) => {
  return useQueryWithToast<GetSetsDetailData>(
    ["matchesData", clubId, leagueId, matchId],
    () => getSetsDetail(clubId, leagueId, matchId),
  );
};

export const useGetSetScore = (
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: string,
  matchStatus: MatchStatus,
) => {
  return useQuery({
    queryKey: ["leagueDetails", leagueId],
    queryFn: () => getSetScore(clubId, leagueId, matchId, setNumber),
    // enabled: !(matchStatus === "IN_PROGRESS"),
    refetchInterval: 5000, // 5초마다 재요청
  });
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

export const usePostMatchStart = (
  clubId: string,
  leagueId: string,
  matchId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postMatchStart(clubId, leagueId, matchId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    onSuccess();
  };
  return useMutationWithToast<PostMatchStartData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePatchSetScore = (
  score: PatchMatchSetScoreRequest,
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: string,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () =>
    patchSetScore(score, clubId, leagueId, matchId, setNumber);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["matchesData", clubId, leagueId, matchId],
    });
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
  };
  return useMutationWithToast<PatchMatchSetScoreData, void>(
    mutationFn,
    onSuccessCallback,
  );
};
