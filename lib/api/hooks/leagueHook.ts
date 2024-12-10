import {
  deleteLeagues,
  deleteParticipateLeague,
  getDateLeague,
  getLeagueCheck,
  getLeagueDetail,
  getMonthLeagues,
  postLeague,
  postParticipateLeague,
  putLeague,
} from "@/lib/api/functions/leagueFn";
import useMutationWithToast from "@/lib/api/hooks/useMutationWithToast";
import useQueryWithToast from "@/lib/api/hooks/useQueryWithToast";
import type {
  DeleteLeagueData,
  DeleteLeagueParticipantData,
  GetLeagueDateData,
  GetLeagueDetailData,
  GetLeagueMonthData,
  PostLeagueData,
  PostLeagueParticipantData,
  PostLeagueRequest,
  PutLeagueData,
  PutLeagueRequest,
} from "@/types/leagueTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const usePostLeague = (clubId: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (leagueData: PostLeagueRequest) => {
    return postLeague(leagueData, clubId);
  };

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["leaguesMonthData", clubId] });
    queryClient.invalidateQueries({ queryKey: ["leaguesDateData"] });
    onSuccess();
  };

  return useMutationWithToast<PostLeagueData, PostLeagueRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const useGetMonthLeagues = (clubId: string, date: string) => {
  return useQueryWithToast<GetLeagueMonthData[]>(
    ["leaguesMonthData", clubId, date],
    () => getMonthLeagues(clubId, date),
  );
};

export const useGetDateLeagues = (clubId: string, date: string) => {
  return useQueryWithToast<GetLeagueDateData[]>(
    ["leaguesDateData", clubId, date],
    () => getDateLeague(clubId, date),
  );
};

export const useGetLeagueDetail = (clubId: string, leagueId: string) => {
  return useQueryWithToast<GetLeagueDetailData>(
    ["leagueDetailData", clubId, leagueId],
    () => getLeagueDetail(clubId, leagueId),
  );
};

export const useGetLeagueCheck = (clubId: string, leagueId: string) => {
  return useQuery({
    queryKey: ["leagueDetailDataCheck", clubId, leagueId],
    queryFn: () => getLeagueCheck(clubId, leagueId),
  });
};

export const usePostParticipantLeague = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => postParticipateLeague({ clubId, leagueId });

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailData", clubId, leagueId],
    });
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailDataCheck", clubId, leagueId],
    });
    onSuccess();
  };

  return useMutationWithToast<PostLeagueParticipantData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const useDeleteParticipantLeague = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => deleteParticipateLeague({ clubId, leagueId });

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailData", clubId, leagueId],
    });
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailDataCheck", clubId, leagueId],
    });
    onSuccess();
  };

  return useMutationWithToast<DeleteLeagueParticipantData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePutLeague = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = (leagueData: PutLeagueRequest) =>
    putLeague(leagueData, clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailData", clubId, leagueId],
    });
    onSuccess();
  };

  return useMutationWithToast<PutLeagueData, PutLeagueRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const useDeleteLeague = (
  clubId: string,
  leagueId: string,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const mutationFn = () => deleteLeagues(clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({
      queryKey: ["leagueDetailData", clubId, leagueId],
    });
    onSuccess();
  };

  return useMutationWithToast<DeleteLeagueData, void>(
    mutationFn,
    onSuccessCallback,
  );
};
