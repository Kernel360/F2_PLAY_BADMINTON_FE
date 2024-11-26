import type { components } from "@/schemas/schema";

export type GetLeagueDetailResponse =
  components["schemas"]["CommonResponseLeagueDetailsResponse"];

export type GetLeagueDetailData =
  components["schemas"]["LeagueDetailsResponse"];

export type GetLeagueCheckResponse =
  components["schemas"]["CommonResponseIsLeagueParticipantResponse"];

export type GetLeagueCheckData =
  components["schemas"]["IsLeagueParticipantResponse"];

export type GetLeagueDateResponse =
  components["schemas"]["CommonResponseListLeagueByDateResponse"];

export type GetLeagueDateData = components["schemas"]["LeagueByDateResponse"];

export type GetLeagueMonthResponse =
  components["schemas"]["CommonResponseListLeagueReadResponse"];

export type GetLeagueMonthData = components["schemas"]["LeagueReadResponse"];

export type PostLeagueRequest = components["schemas"]["LeagueCreateRequest"];

export type PostLeagueResponse =
  components["schemas"]["CommonResponseLeagueCreateResponse"];

export type PostLeagueData = components["schemas"]["LeagueCreateResponse"];

export type PostLeagueParticipantResponse =
  components["schemas"]["CommonResponseLeagueParticipantResponse"];

export type PostLeagueParticipantData =
  components["schemas"]["LeagueParticipantResponse"];

export type PatchLeagueRequest = components["schemas"]["LeagueUpdateRequest"];

export type PatchLeagueResponse =
  components["schemas"]["CommonResponseLeagueUpdateResponse"];

export type PatchLeagueData = components["schemas"]["LeagueUpdateResponse"];

export type DeleteLeagueResponse =
  components["schemas"]["CommonResponseLeagueCancelResponse"];

export type DeleteLeagueData = components["schemas"]["LeagueCancelResponse"];

export type DeleteLeagueParticipantResponse =
  components["schemas"]["CommonResponseLeagueParticipationCancelResponse"];

export type DeleteLeagueParticipantData =
  components["schemas"]["LeagueParticipationCancelResponse"];
