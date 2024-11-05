import type { components } from "@/schemas/schema";

export type GetMemberSessionResponse =
  components["schemas"]["CommonResponseSimpleMemberResponse"];

export type GetMemberSessionData =
  components["schemas"]["SimpleMemberResponse"];

export type MemberImageUpdate = components["schemas"]["MemberUpdateRequest"];
export type MemberMyPageData = components["schemas"]["MemberMyPageResponse"];
