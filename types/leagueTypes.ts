import type { components } from "@/schemas/schema";

export type GetLeagueDetailResponse =
  components["schemas"]["CommonResponseLeagueDetailsResponse"];

export type GetLeagueDetailData =
  components["schemas"]["LeagueDetailsResponse"];

export type PostLeagueRequest = components["schemas"]["LeagueCreateRequest"];

export type PostLeagueResponse =
  components["schemas"]["CommonResponseLeagueCreateResponse"];

export type PostLeagueData = components["schemas"]["LeagueCreateResponse"];

export type PatchLeagueRequest = components["schemas"]["LeagueUpdateRequest"];

export type PatchLeagueResponse =
  components["schemas"]["CommonResponseLeagueUpdateResponse"];

export type PatchLeagueData = components["schemas"]["LeagueUpdateResponse"];

export type TierLimit = "GOLD" | "SILVER" | "BRONZE";
