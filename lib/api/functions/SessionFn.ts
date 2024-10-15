import type { loggedInState } from "@/types/sessionTypes";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export async function getLoginState(): Promise<loggedInState> {
  const response = await fetch("/api/auth/check-session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("로그인 상태를 확인할 수 없습니다.");
  }
  return response.json();
}

export async function postLogout(): Promise<object> {
  const response = await fetch(`${BASE_URL}/members/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("로그아웃 실패");
  }
  return response;
}
