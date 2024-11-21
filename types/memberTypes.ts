import type { components } from "@/schemas/schema";

export type GetMemberSessionResponse =
  components["schemas"]["CommonResponseSimpleMemberResponse"];

export type GetMemberSessionData =
  components["schemas"]["SimpleMemberResponse"];

export type GetMemberMyPageResponse =
  components["schemas"]["CommonResponseMemberMyPageResponse"];

export type GetMemberMyPageData = components["schemas"]["MemberMyPageResponse"];

export type GetMemberMyClubsResponse =
  components["schemas"]["CommonResponseListClubCardResponse"];

export type GetMemberMyClubsData = components["schemas"]["ClubCardResponse"];

export type GetMemberMachesRecordResponse =
  components["schemas"]["CommonResponseCustomPageResponseMatchResultResponse"];

export type GetMemberMachesRecordData =
  components["schemas"]["CustomPageResponseMatchResultResponse"];

export type GetMemberMachesRecord =
  components["schemas"]["MatchResultResponse"];

export type PostMembersProfileImageResponse =
  components["schemas"]["CommonResponseString"];

export type PutMemberProfileResponse =
  components["schemas"]["CommonResponseMemberUpdateResponse"];

export type PutMemberProfileData =
  components["schemas"]["MemberUpdateResponse"];

export type PutMemberProfileRequest =
  components["schemas"]["MemberUpdateRequest"];

export type MemberRole = "ROLE_USER" | "ROLE_OWNER" | "ROLE_MANAGER";
