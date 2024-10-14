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
