import restClient from "@/lib/api/restClient";
import type {
  DeleteLeagueParticipantResponse,
  DeleteLeagueResponse,
  GetLeagueCheckResponse,
  GetLeagueDateResponse,
  GetLeagueDetailResponse,
  GetLeagueMonthResponse,
  PatchLeagueResponse,
  PostLeagueParticipantResponse,
  PostLeagueRequest,
  PostLeagueResponse,
  PutLeagueRequest,
  PutLeagueResponse,
} from "@/types/leagueTypes";

export const postLeague = async (
  postLeagueData: PostLeagueRequest,
  clubId: string,
): Promise<PostLeagueResponse> => {
  return restClient.post<PostLeagueResponse>(
    `/clubs/${clubId}/leagues`,
    postLeagueData,
  );
};

export const getMonthLeagues = async (
  clubId: string,
  date: string,
): Promise<GetLeagueMonthResponse> => {
  return restClient.get<GetLeagueMonthResponse>(
    `/clubs/${clubId}/leagues/month?date=${date}`,
  );
};

export const getDateLeague = async (
  clubId: string,
  date: string,
): Promise<GetLeagueDateResponse> => {
  return restClient.get<GetLeagueDateResponse>(
    `/clubs/${clubId}/leagues/date?date=${date}`,
  );
};

// TODO: props 타입 분리
export const getLeagueDetail = async (
  clubId: string,
  leagueId: string,
): Promise<GetLeagueDetailResponse> => {
  return restClient.get<GetLeagueDetailResponse>(
    `/clubs/${clubId}/leagues/${leagueId}`,
  );
};

export const getLeagueCheck = async (
  clubId: string,
  leagueId: string,
): Promise<GetLeagueCheckResponse> => {
  return restClient.get<GetLeagueCheckResponse>(
    `/clubs/${clubId}/leagues/${leagueId}/check`,
  );
};

export const postParticipateLeague = async ({
  clubId,
  leagueId,
}: {
  clubId: string;
  leagueId: string;
}): Promise<PostLeagueParticipantResponse> => {
  return restClient.post(`/clubs/${clubId}/leagues/${leagueId}/participation`);
};

export const deleteParticipateLeague = async ({
  clubId,
  leagueId,
}: {
  clubId: string;
  leagueId: string;
}): Promise<DeleteLeagueParticipantResponse> => {
  return restClient.delete(
    `/clubs/${clubId}/leagues/${leagueId}/participation`,
  );
};

export const patchLeague = async (
  clubId: string,
  leagueId: string,
): Promise<PatchLeagueResponse> => {
  return restClient.patch<PatchLeagueResponse>(
    `/clubs/${clubId}/leagues/${leagueId}`,
    {},
  );
};

export const putLeague = async (
  leagueData: PutLeagueRequest,
  clubId: string,
  leagueId: string,
): Promise<PutLeagueResponse> => {
  return restClient.put<PutLeagueResponse>(
    `/clubs/${clubId}/leagues/${leagueId}`,
    leagueData,
  );
};

export const deleteLeagues = async (
  clubId: string,
  leagueId: string,
): Promise<DeleteLeagueResponse> => {
  return restClient.delete<DeleteLeagueResponse>(
    `/clubs/${clubId}/leagues/${leagueId}`,
  );
};
