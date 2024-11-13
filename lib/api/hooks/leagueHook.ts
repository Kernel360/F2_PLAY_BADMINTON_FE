import type {
  GetLeagueDateData,
  GetLeagueDetailData,
  GetLeagueMonthData,
  PatchLeagueRequest,
  PostLeagueRequest,
} from "@/types/leagueTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteLeagues,
  deleteParticipateLeague,
  getDateLeague,
  getLeagueDetail,
  getMonthLeagues,
  patchLeague,
  postLeague,
  postParticipateLeague,
} from "../functions/leagueFn";
import useQueryWithToast from "./useQueryWithToast";

export const usePostLeague = (clubId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leagueData: PostLeagueRequest) =>
      postLeague(leagueData, clubId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaguesData"] });
      queryClient.invalidateQueries({ queryKey: ["leaguesDateData"] });
    },
    onError: (error: Error) => alert(error),
  });
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

export const usePostParticipateLeague = (clubId: string, leagueId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postParticipateLeague(clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
};

export const useDeleteParticipateLeague = (
  clubId: string,
  leagueId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteParticipateLeague(clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
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

  return useMutation({
    mutationFn: () => deleteLeagues(clubId, leagueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leagueDetailData"] });
    },
    onError: (error: Error) => alert(error),
  });
};
