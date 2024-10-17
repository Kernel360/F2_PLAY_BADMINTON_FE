import type { components } from "@/schemas/schema";

type MemberIsClubMemberResponse =
  components["schemas"]["MemberIsClubMemberResponse"];

type Member = components["schemas"]["MemberMyPageResponse"];

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
      throw new Error("멤버가 클럽에 속해있는지 조회할 수 없습니다.");
    }

    return response.json();
  };

export async function getMyInfo(): Promise<Member> {
  const response = await fetch(`${BASE_URL}/members/myPage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("내정보를 불러올 수 없습니다.");
  }
  return response.json();
}
