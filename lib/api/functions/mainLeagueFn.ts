import type {
  GetMainLeaguesMatchResponse,
  GetMainLeaguesResponse,
} from "@/types/mainLeagueTypes";
import restClient from "../restClient";

export const getMainLeague = async ({
  pageParam,
  leagueStatus,
  region,
  date,
  size,
}: {
  pageParam: unknown;
  leagueStatus: "ALL" | "RECRUITING" | "PLAYING";
  region: "ALL";
  date: string;
  size: number;
}) => {
  return restClient.get<GetMainLeaguesResponse>(
    `/leagues?leagueStatus=${leagueStatus}&region=${region}&date=${date}&page=${pageParam}&size=${size}`,
  );
};

export const getMainLeagueMatch = async (
  leagueId: string,
): Promise<GetMainLeaguesMatchResponse> => {
  return restClient.get<GetMainLeaguesMatchResponse>(`/leagues/${leagueId}`);
};
