import type { components } from "@/schemas/schema";

export type Member = components["schemas"]["MemberMyPageResponse"];

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export async function getMyInfo(): Promise<Member> {
  const response = await fetch(`${BASE_URL}/members/myPage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("내정보를 불러올 수 없습니다. ");
  }
  return response.json();
}
