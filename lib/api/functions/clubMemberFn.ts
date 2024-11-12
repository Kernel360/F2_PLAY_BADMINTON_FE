import type { components } from "@/schemas/schema";
import type {
  GetClubMemberCheckResponse,
  PostClubMemberRequest,
  PostClubMemberResponse,
} from "@/types/clubMemberTypes";
import restClient from "../restClient";

type ClubMemberResponse = components["schemas"]["ClubMemberResponse"];
type ClubMemberRoleUpdateRequest =
  components["schemas"]["ClubMemberRoleUpdateRequest"];
type ClubMemberExpelRequest = components["schemas"]["ClubMemberExpelRequest"];
type ClubMemberBanRequest = components["schemas"]["ClubMemberBanRequest"];
type ClubMemberBanRecordResponse =
  components["schemas"]["ClubMemberBanRecordResponse"];
// type ClubMemberJoinResponse = components["schemas"]["ClubMemberJoinResponse"];

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
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("멤버 정보 조회에 실패했습니다.");
  }

  return response.json();
};

export const getClubMembersCheck = async (
  clubId: string,
): Promise<GetClubMemberCheckResponse> => {
  return restClient.get<GetClubMemberCheckResponse>(
    `/clubs/${clubId}/clubMembers/check`,
  );
};

export const postClubMembers = async (
  clubId: string,
  // applyReason: PostClubMemberRequest,
): Promise<PostClubMemberResponse> => {
  // const response = await fetch(`${BASE_URL}/clubs/${clubId}/clubMembers`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  // });

  // if (!response.ok) {
  //   throw new Error("동호회 가입 신청에 실패했습니다.");
  // }

  // return response.json();

  return restClient.post<PostClubMemberResponse>(
    `/clubs/${clubId}/clubMembers`,
    { apply_reason: "test" },
  );
};

export const patchClubMembersRole = async (
  role: ClubMemberRoleUpdateRequest,
  clubId: number,
  clubMemberId: number,
): Promise<ClubMemberResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/clubMembers/role?clubMemberId=${clubMemberId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(role),
    },
  );
  console.log(role, clubId, clubMemberId);
  if (!response.ok) {
    throw new Error("멤버 역할 변경에 실패했습니다.");
  }

  return response.json();
};

export const patchClubMembersExpel = async (
  expelReason: ClubMemberExpelRequest,
  clubId: number,
  clubMemberId: number,
): Promise<ClubMemberBanRecordResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/clubMembers/expel?clubMemberId=${clubMemberId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expelReason),
    },
  );

  if (!response.ok) {
    throw new Error("멤버 강제 탈퇴에 실패했습니다.");
  }

  return response.json();
};

export const patchClubMembersBan = async (
  ban: ClubMemberBanRequest,
  clubId: number,
  clubMemberId: number,
): Promise<ClubMemberBanRecordResponse> => {
  const response = await fetch(
    `${BASE_URL}/clubs/${clubId}/clubMembers/ban?clubMemberId=${clubMemberId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(ban),
    },
  );

  if (!response.ok) {
    throw new Error("멤버 정지에 실패했습니다.");
  }

  return response.json();
};
