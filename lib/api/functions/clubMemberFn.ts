import type {
  GetClubMemberBanListResponse,
  GetClubMemberCheckResponse,
  GetClubMemberListResponse,
  PatchClubMemberBanRequest,
  PatchClubMemberBanResponse,
  PatchClubMemberExpelRequest,
  PatchClubMemberExpelResponse,
  PatchClubMemberRoleRequest,
  PatchClubMemberRoleResponse,
  PostClubMemberApproveResponse,
  PostClubMemberRequest,
  PostClubMemberResponse,
} from "@/types/clubMemberTypes";
import restClient from "../restClient";

export const getClubMembers = async ({
  pageParam,
  clubId,
  size,
}: {
  pageParam: unknown;
  clubId: string;
  size: number;
}): Promise<GetClubMemberListResponse> => {
  return restClient.get<GetClubMemberListResponse>(
    `/clubs/${clubId}/clubMembers?page=${pageParam}&size=${size}`,
  );
};

export const getClubBanMembers = async ({
  pageParam,
  clubId,
  size,
}: {
  pageParam: unknown;
  clubId: string;
  size: number;
}): Promise<GetClubMemberBanListResponse> => {
  return restClient.get<GetClubMemberBanListResponse>(
    `/clubs/${clubId}/clubMembers/ban?page=${pageParam}&size=${size}`,
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
  expel: PatchClubMemberExpelRequest,
  clubId: string,
  clubMemberId: number,
): Promise<PatchClubMemberExpelResponse> => {
  return restClient.patch<PatchClubMemberExpelResponse>(
    `/clubs/${clubId}/clubMembers/expel?clubMemberId=${clubMemberId}`,
    expel,
  );
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

export const postClubMembersApprove = async (
  clubId: string,
  clubApplyId: number,
): Promise<PostClubMemberApproveResponse> => {
  return restClient.post<PostClubMemberApproveResponse>(
    `/clubs/${clubId}/clubMembers/approve?clubApplyId=${clubApplyId}`,
  );
};

export const postClubMembersReject = async (
  clubId: string,
  clubApplyId: number,
): Promise<PostClubMemberApproveResponse> => {
  return restClient.post<PostClubMemberApproveResponse>(
    `/clubs/${clubId}/clubMembers/reject?clubApplyId=${clubApplyId}`,
  );
};
