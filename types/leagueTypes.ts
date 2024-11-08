import type { components } from "@/schemas/schema";

export type PatchLeaguesRequest = components["schemas"]["LeagueUpdateRequest"];

export type GetLeagueDetailResponse =
  components["schemas"]["CommonResponseLeagueDetailsResponse"];

export type GetLeagueDetailData =
  components["schemas"]["LeagueDetailsResponse"];

export type PostLeagueRequest = components["schemas"]["LeagueCreateRequest"];

export type PostLeagueResponse =
  components["schemas"]["CommonResponseLeagueCreateResponse"];

export type PostLeagueCreateData =
  components["schemas"]["LeagueCreateResponse"];

export type LeagueUpdateRequest = components["schemas"]["LeagueUpdateRequest"];

export type TierLimit = "GOLD" | "SILVER" | "BRONZE";
