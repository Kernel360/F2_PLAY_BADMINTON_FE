import type { components } from "@/schemas/schema";
import type {
  GetClubMemberCheckResponse,
  GetClubMemberListResponse,
  PatchClubMemberBanRequest,
  PatchClubMemberBanResponse,
  PatchClubMemberRoleRequest,
  PatchClubMemberRoleResponse,
  PostClubMemberRequest,
  PostClubMemberResponse,
} from "@/types/clubMemberTypes";
import restClient from "../restClient";

type ClubMemberExpelRequest = components["schemas"]["ClubMemberExpelRequest"];
type ClubMemberBanRequest = components["schemas"]["ClubMemberBanRequest"];
type ClubMemberBanRecordResponse =
  components["schemas"]["ClubMemberBanRecordResponse"];
// type ClubMemberJoinResponse = components["schemas"]["ClubMemberJoinResponse"];

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getClubMembers = async (
  clubId: string,
): Promise<GetClubMemberListResponse> => {
  return restClient.get<GetClubMemberListResponse>(
    `/clubs/${clubId}/clubMembers`,
  );
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
  applyReason: PostClubMemberRequest,
): Promise<PostClubMemberResponse> => {
  return restClient.post<PostClubMemberResponse>(
    `/clubs/${clubId}/clubMembers`,
    applyReason,
  );
};

export const patchClubMembersRole = async (
  role: PatchClubMemberRoleRequest,
  clubId: string,
  clubMemberId: number,
): Promise<PatchClubMemberRoleResponse> => {
  return restClient.patch<PatchClubMemberRoleResponse>(
    `/clubs/${clubId}/clubMembers/role?clubMemberId=${clubMemberId}`,
    role,
  );
};

export const patchClubMembersExpel = async (
  expelReason: ClubMemberExpelRequest,
  clubId: string,
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
  ban: PatchClubMemberBanRequest,
  clubId: string,
  clubMemberId: number,
): Promise<PatchClubMemberBanResponse> => {
  return restClient.patch<PatchClubMemberBanResponse>(
    `/clubs/${clubId}/clubMembers/ban?clubMemberId=${clubMemberId}`,
    ban,
  );
};
