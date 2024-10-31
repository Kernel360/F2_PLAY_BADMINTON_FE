import type { components } from "@/schemas/schema";

export type GetClubMemberListResponse =
  components["schemas"]["CommonResponseMapClubMemberRoleListClubMemberResponse"];

// export type PostClubMemberJoinResponse =
//   components["schemas"]["CommonResponseClubMemberJoinResponse"];

export type DeleteClubMemberExitResponse =
  components["schemas"]["CommonResponseClubMemberWithdrawResponse"];

export type PatchClubMemberRoleRequest =
  components["schemas"]["ClubMemberRoleUpdateRequest"];

export type PatchClubMemberRoleResponse =
  components["schemas"]["CommonResponseClubMemberResponse"];

export type PatchClubMemberExpelRequest =
  components["schemas"]["ClubMemberExpelRequest"];

export type PatchClubMemberExpelResponse =
  components["schemas"]["CommonResponseClubMemberBanRecordResponse"];

export type PatchClubMemberBanRequest =
  components["schemas"]["ClubMemberBanRequest"];

export type PatchClubMemberBanResponse =
  components["schemas"]["CommonResponseClubMemberBanRecordResponse"];
