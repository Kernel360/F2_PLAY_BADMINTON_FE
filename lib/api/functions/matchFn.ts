import type { GetMatchesResponse } from "@/types/matchTypes";
import restClient from "../restClient";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

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
): Promise<string> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}/matches`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("대진표 생성에 실패했습니다.");
  }

  return response.text();
};
