import restClient from "@/lib/api/restClient";
import type {
  GetMatchesResponse,
  GetSetScoreResponse,
  GetSetsDetailResponse,
  PatchMatchSetScoreRequest,
  PatchMatchSetScoreResponse,
  PostMatchStartResponse,
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

export const getSetsDetail = async (
  clubId: string,
  leagueId: string,
  matchId: string,
): Promise<GetSetsDetailResponse> => {
  return restClient.get<GetSetsDetailResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}`,
  );
};

export const getSetScore = async (
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: string,
): Promise<GetSetScoreResponse> => {
  return restClient.get<GetSetScoreResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}/sets/${setNumber}`,
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

export const postMatchStart = async (
  clubId: string,
  leagueId: string,
  matchId: string,
): Promise<PostMatchStartResponse> => {
  return restClient.post<PostMatchStartResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}/sets/init`,
  );
};

export const patchSetScore = async (
  score: PatchMatchSetScoreRequest,
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: string,
): Promise<PatchMatchSetScoreResponse> => {
  return restClient.patch<PatchMatchSetScoreResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}/sets/${setNumber}`,
    score,
  );
};
