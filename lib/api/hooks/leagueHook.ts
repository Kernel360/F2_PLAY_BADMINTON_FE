import type { components } from "@/schemas/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteParticipateLeague,
  getDateLeagues,
  getLeagueDetail,
  getMonthLeagues,
  postLeagues,
  postParticipateLeague,
} from "../functions/leagueFn";

type LeagueCreateRequest = components["schemas"]["LeagueCreateRequest"];

export const usePostLeagues = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leagueData: LeagueCreateRequest) =>
      postLeagues(leagueData, clubId),
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

export const useGetDateLeagues = (clubId: number, date: string) => {
  return useQuery({
    queryKey: ["leaguesDateData"],
    queryFn: () => getDateLeagues(clubId, date),
  });
};

export const useGetLeagueDetail = (clubId: number, leagueId: number) => {
  return useQuery({
    queryKey: ["leagueDetailData"],
    queryFn: () => getLeagueDetail(clubId, leagueId),
  });
};

export const usePostParticipateLeague = (clubId: number, leagueId: number) => {
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
  clubId: number,
  leagueId: number,
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
