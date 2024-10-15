import type { components } from "@/schemas/schema";

type ClubMemberResponse = components["schemas"]["ClubMemberResponse"];
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

interface ClubMembersData {
  ROLE_OWNER: ClubMemberResponse[];
  ROLE_MANAGER: ClubMemberResponse[];
  ROLE_USER: ClubMemberResponse[];
}

export async function getClubMembers(): Promise<ClubMembersData> {
  try {
    /* TODO(iamgyu): 현재 ID가 지정해준 값으로 들어가 있기 때문에 추후에 변경 필요 */
    const response = await fetch(`${BASE_URL}/clubs/1/clubMembers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as ClubMembersData;
  } catch (error) {
    console.error(error);
    return {
      ROLE_OWNER: [],
      ROLE_MANAGER: [],
      ROLE_USER: [],
    };
  }
}
