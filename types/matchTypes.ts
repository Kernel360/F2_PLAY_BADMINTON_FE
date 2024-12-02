import type { components } from "@/schemas/schema";

export type GetMatchesResponse =
  components["schemas"]["CommonResponseBracketResponse"];

export type GetMatchesData = components["schemas"]["BracketResponse"];

export type GetSetsDetailResponse =
  components["schemas"]["CommonResponseMatchDetailsResponse"];

export type GetSetsDetailData = components["schemas"]["MatchDetailsResponse"];

export type GetSetScoreResponse =
  components["schemas"]["CommonResponseMatchSetResponse"];

export type GetSetScoreData = components["schemas"]["MatchSetResponse"];

export type PostMatchesResponse =
  components["schemas"]["CommonResponseBracketResponse"];

export type PostMatchesData = components["schemas"]["BracketResponse"];

export type PostMatchStartResponse =
  components["schemas"]["CommonResponseString"];

export type PostMatchStartData = string;

export type PatchMatchSetScoreRequest =
  components["schemas"]["SetScoreUpdateRequest"];

export type PatchMatchSetScoreResponse =
  components["schemas"]["CommonResponseSetScoreResponse"];

export type PatchMatchSetScoreData = components["schemas"]["SetScoreResponse"];

export type MatchParticipant = components["schemas"]["Participant"];

export type MatchStatus = "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
