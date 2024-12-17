import restClient from "@/lib/api/restClient";
import type {
  GetMatchesResponse,
  GetSetScoreResponse,
  GetSetsDetailResponse,
  PatchMatchSetScoreRequest,
  PatchMatchSetScoreResponse,
  PostMatchSetScoreRequest,
  PostMatchSetScoreResponse,
  PostMatchStartResponse,
  PostMatchesResponse,
} from "@/types/matchTypes";

export const getMatches = async (
  clubId: string,
  leagueId: string,
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
  setNumber: number,
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

export const postSetScore = async (
  score: PostMatchSetScoreRequest,
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: number,
): Promise<PostMatchSetScoreResponse> => {
  return restClient.post<PostMatchSetScoreResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}/sets/${setNumber}`,
    score,
  );
};

export const patchSetScore = async (
  score: PatchMatchSetScoreRequest,
  clubId: string,
  leagueId: string,
  matchId: string,
  setNumber: number,
): Promise<PatchMatchSetScoreResponse> => {
  return restClient.patch<PatchMatchSetScoreResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/matches/${matchId}/sets/${setNumber}`,
    score,
  );
};
