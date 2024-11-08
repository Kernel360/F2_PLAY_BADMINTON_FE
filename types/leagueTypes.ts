import type { components } from "@/schemas/schema";

export type PatchLeaguesRequest = components["schemas"]["LeagueUpdateRequest"];

export type GetLeagueDetailData =
  components["schemas"]["LeagueDetailsResponse"];

export type LeagueCreateRequest = components["schemas"]["LeagueCreateRequest"];

export type LeagueUpdateRequest = components["schemas"]["LeagueUpdateRequest"];

export type TierLimit = "GOLD" | "SILVER" | "BRONZE";
