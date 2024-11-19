import type { components } from "@/schemas/schema";

export type GetLeagueDetailResponse =
  components["schemas"]["CommonResponseLeagueDetailsResponse"];

export type GetLeagueDetailData =
  components["schemas"]["LeagueDetailsResponse"];

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

export type PatchLeagueRequest = components["schemas"]["LeagueUpdateRequest"];

export type PatchLeagueResponse =
  components["schemas"]["CommonResponseLeagueUpdateResponse"];

export type PatchLeagueData = components["schemas"]["LeagueUpdateResponse"];

export type TierLimit = "GOLD" | "SILVER" | "BRONZE";

export type LeagueStatus =
  | "ALL"
  | "RECRUITING"
  | "RECRUITING_COMPLETED"
  | "PLAYING"
  | "CANCELED"
  | "FINISHED";
