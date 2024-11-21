import type {
  DeleteLeagueData,
  DeleteLeagueParticipantData,
  GetLeagueDateData,
  GetLeagueDetailData,
  GetLeagueMonthData,
  PatchLeagueRequest,
  PostLeagueData,
  PostLeagueParticipantData,
  PostLeagueRequest,
} from "@/types/leagueTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLeagues,
  deleteParticipateLeague,
  getDateLeague,
  getLeagueCheck,
  getLeagueDetail,
  getMonthLeagues,
  patchLeague,
  postLeague,
  postParticipateLeague,
} from "../functions/leagueFn";
import useMutationWithToast from "./useMutationWithToast";
import useQueryWithToast from "./useQueryWithToast";

export const usePostLeague = (clubId: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const mutationFn = (leagueData: PostLeagueRequest) => {
    return postLeague(leagueData, clubId);
  };

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["leaguesMonthData"] });
    queryClient.invalidateQueries({ queryKey: ["leaguesDateData"] });
    onSuccess();
  };

  return useMutationWithToast<PostLeagueData, PostLeagueRequest>(
    mutationFn,
    onSuccessCallback,
  );
};

export const useGetMonthLeagues = (clubId: string, date: string) => {
  return useQueryWithToast<GetLeagueMonthData[]>(["leaguesMonthData"], () =>
    getMonthLeagues(clubId, date),
  );
};

export const useGetDateLeagues = (clubId: string, date: string) => {
  return useQueryWithToast<GetLeagueDateData[]>(["leaguesDateData"], () =>
    getDateLeague(clubId, date),
  );
};

export const useGetLeagueDetail = (clubId: string, leagueId: string) => {
  return useQueryWithToast<GetLeagueDetailData>(["leagueDetailData"], () =>
    getLeagueDetail(clubId, leagueId),
  );
};

export const useGetLeagueCheck = (clubId: string, leagueId: string) => {
  return useQuery({
    queryKey: ["leagueDetailDataCheck"],
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
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    queryClient.invalidateQueries({ queryKey: ["leagueDetailDataCheck"] });
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
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    queryClient.invalidateQueries({ queryKey: ["leagueDetailDataCheck"] });
    onSuccess();
  };

  return useMutationWithToast<DeleteLeagueParticipantData, void>(
    mutationFn,
    onSuccessCallback,
  );
};

export const usePatchLeague = (clubId: string, leagueId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leagueData: PatchLeagueRequest) =>
      patchLeague(leagueData, clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const useDeleteLeague = (clubId: string, leagueId: string) => {
  const queryClient = useQueryClient();

  const mutationFn = () => deleteLeagues(clubId, leagueId);

  const onSuccessCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
  };

  return useMutationWithToast<DeleteLeagueData, void>(
    mutationFn,
    onSuccessCallback,
  );
};
