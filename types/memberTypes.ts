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
  components["schemas"]["CommonResponseListMatchResultResponse"];

export type GetMemberMachesRecordData =
  components["schemas"]["MatchResultResponse"];

export type PostMembersProfileImageResponse =
  components["schemas"]["CommonResponseString"];

export type PutMemberProfileResponse =
  components["schemas"]["CommonResponseMemberUpdateResponse"];

export type PutMemberProfileRequest =
  components["schemas"]["MemberUpdateRequest"];
