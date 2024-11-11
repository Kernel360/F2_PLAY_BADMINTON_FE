import type {
  GetLeagueDateData,
  GetLeagueDetailData,
  PatchLeagueRequest,
  PostLeagueRequest,
} from "@/types/leagueTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLeagues,
  deleteParticipateLeague,
  getDateLeague,
  getLeagueDetail,
  getMonthLeagues,
  patchLeague,
  // patchLeagues,
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

export const useGetMonthLeagues = (clubId: number, date: string) => {
  return useQuery({
    queryKey: ["leaguesData"],
    queryFn: () => getMonthLeagues(clubId, date),
  });
};

export const useGetDateLeagues = (clubId: string, date: string) => {
  return useQueryWithToast<GetLeagueDateData[]>(["clubsActivityData"], () =>
    getDateLeague(clubId, date),
  );
  // return useQuery({
  //   queryKey: ["leaguesDateData"],
  //   queryFn: () => getDateLeague(clubId, date),
  // });
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
