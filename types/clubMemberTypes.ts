import type { components } from "@/schemas/schema";

export type GetClubMemberListResponse =
  components["schemas"]["CommonResponseClubMemberRoleResponse"];

export type GetClubMemberListData =
  components["schemas"]["ClubMemberRoleResponse"];

export type GetClubMemberCheckResponse =
  components["schemas"]["CommonResponseMemberIsClubMemberResponse"];

export type GetClubMemberCheckData =
  components["schemas"]["MemberIsClubMemberResponse"];

export type PostClubMemberRequest = components["schemas"]["ClubApplyRequest"];

export type PostClubMemberResponse =
  components["schemas"]["CommonResponseClubApplyResponse"];

export type PostClubMemberData = components["schemas"]["ClubApplyResponse"];

export type PostClubMemberApproveResponse =
  components["schemas"]["CommonResponseApproveApplyResponse"];

export type PostClubMemberApproveData =
  components["schemas"]["ApproveApplyResponse"];

export type PostClubMemberRejectResponse =
  components["schemas"]["CommonResponseRejectApplyResponse"];

export type PostClubMemberRejectData =
  components["schemas"]["RejectApplyResponse"];

export type DeleteClubMemberExitResponse =
  components["schemas"]["CommonResponseClubMemberWithdrawResponse"];

export type PatchClubMemberRoleRequest =
  components["schemas"]["ClubMemberRoleUpdateRequest"];

export type PatchClubMemberRoleResponse =
  components["schemas"]["CommonResponseClubMemberResponse"];

export type PatchClubMemberRoleData =
  components["schemas"]["ClubMemberResponse"];

export type PatchClubMemberExpelRequest =
  components["schemas"]["ClubMemberExpelRequest"];

export type PatchClubMemberExpelResponse =
  components["schemas"]["CommonResponseClubMemberBanRecordResponse"];

export type PatchClubMemberExpelData =
  components["schemas"]["ClubMemberBanRecordResponse"];

export type PatchClubMemberBanRequest =
  components["schemas"]["ClubMemberBanRequest"];

export type PatchClubMemberBanResponse =
  components["schemas"]["CommonResponseClubMemberBanRecordResponse"];

export type PatchClubMemberBanData =
  components["schemas"]["ClubMemberBanRecordResponse"];

export type ClubApplicantsStatus = "APPROVED" | "PENDING" | "REJECTED";
