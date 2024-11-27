import restClient from "@/lib/api/restClient";
import type {
  GetMatchesResponse,
  PostMatchesResponse,
} from "@/types/matchTypes";

export const getMatches = async (
  clubId: string,
  leagueId: number,
): Promise<GetMatchesResponse> => {
  return restClient.get<GetMatchesResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches`,
  );
};

export const postMatches = async (
  clubId: string,
  leagueId: string,
): Promise<PostMatchesResponse> => {
  return restClient.post<PostMatchesResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches`,
  );
};
