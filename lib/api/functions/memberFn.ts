import type { components } from "@/schemas/schema";

type MemberIsClubMemberResponse =
  components["schemas"]["MemberIsClubMemberResponse"];
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getIsClubMember =
  async (): Promise<MemberIsClubMemberResponse> => {
    const response = await fetch(`${BASE_URL}/members/is-club-member`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("멤버가 클럽에 속해있는지 조회에 실패하였습니다.");
    }

    return response.json();
  };
