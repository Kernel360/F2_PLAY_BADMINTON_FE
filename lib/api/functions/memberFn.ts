import type { components } from "@/schemas/schema";

type MemberIsClubMemberResponse =
  components["schemas"]["MemberIsClubMemberResponse"];
type MemberMyPageResponse = components["schemas"]["MemberMyPageResponse"];
type MemberUpdateRequest = components["schemas"]["MemberUpdateRequest"];
type MemberResponse = components["schemas"]["MemberResponse"];
type MemberMatchRecord = components["schemas"]["MatchResultResponse"];

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

export const getMembersMyPage = async (): Promise<MemberMyPageResponse> => {
  const response = await fetch(`${BASE_URL}/members/myPage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("내 정보 조회에 실패하였습니다.");
  }

  return response.json();
};

export const postMembersProfileImage = async (
  profileImage: FormData,
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/members/profileImage`, {
    method: "POST",
    // headers: { "Content-Type": "multipart/form-data" },
    credentials: "include",
    body: profileImage,
  });

  if (!response.ok) {
    throw new Error("프로필 사진을 S3에 업로드를 실패했습니다.");
  }

  return response.text();
};

export const putMembersProfileImage = async (
  profileImage: MemberUpdateRequest,
): Promise<MemberResponse> => {
  const response = await fetch(`${BASE_URL}/members/profileImage`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profileImage),
  });

  if (!response.ok) {
    throw new Error("프로필 사진 수정에서 에러가 발생하였습니다.");
  }

  return response.json();
};

export const getMembersMatchRecord = async (): Promise<MemberMatchRecord[]> => {
  const response = await fetch(`${BASE_URL}/members/matchesRecord`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("내 경기 결과 조회에 실패하였습니다.");
  }

  return response.json();
};
