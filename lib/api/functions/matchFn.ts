import type { components } from "@/schemas/schema";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

type MatchResponse = components["schemas"]["MatchResponse"];

export const getMatches = async (
  clubId: number,
  leagueId: number,
): Promise<MatchResponse[]> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/leagues/${leagueId}/matches`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("대진표 조회에 실패했습니다.");
  }

  return response.json();
};

export const postMatches = async (
  clubId: number,
  leagueId: number,
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
