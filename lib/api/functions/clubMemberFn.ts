import type { components } from "@/schemas/schema";

type ClubMemberResponse = components["schemas"]["ClubMemberResponse"];
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface ClubMembersData {
  ROLE_OWNER: ClubMemberResponse[];
  ROLE_MANAGER: ClubMemberResponse[];
  ROLE_USER: ClubMemberResponse[];
}

export const getClubMembers = async (
  clubId: number,
): Promise<ClubMembersData> => {
  const response = await fetch(`${BASE_URL}/clubs/${clubId}/clubMembers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("멤버 정보 조회에 실패했습니다.");
  }

  return response.json();
};
