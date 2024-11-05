import type { components } from "@/schemas/schema";
import type { GetMemberSessionResponse } from "@/types/memberTypes";
import restClient from "../restClient";

type MemberMyPageResponse =
  components["schemas"]["CommonResponseMemberMyPageResponse"];
type MemberMatchRecord = components["schemas"]["MatchResultResponse"];

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getMembersSession =
  async (): Promise<GetMemberSessionResponse> => {
    return restClient.get<GetMemberSessionResponse>("/members/session");
  };

export const getMembersMyPage = async (): Promise<MemberMyPageResponse> => {
  return restClient.get<MemberMyPageResponse>("/members/myPage");
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

// export const putMembersProfileImage = async (
//   profileImage: MemberUpdateRequest,
// ): Promise<MemberResponse> => {
//   const response = await fetch(`${BASE_URL}/members/profileImage`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify(profileImage),
//   });

//   if (!response.ok) {
//     throw new Error("프로필 사진 수정에서 에러가 발생하였습니다.");
//   }

//   return response.json();
// };

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
