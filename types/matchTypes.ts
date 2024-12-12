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

export type PostMatchSetScoreRequest =
  components["schemas"]["SetScoreUpdateRequest"];

export type PostMatchSetScoreResponse =
  components["schemas"]["CommonResponseSetScoreFinishResponse"];

export type PostMatchSetScoreData =
  components["schemas"]["SetScoreFinishResponse"];

export type PatchMatchSetScoreRequest =
  components["schemas"]["SetScoreUpdateRequest"];

export type PatchMatchSetScoreResponse =
  components["schemas"]["CommonResponseSetScoreResponse"];

export type PatchMatchSetScoreData = components["schemas"]["SetScoreResponse"];

export type MatchParticipantType = components["schemas"]["Participant"];

export type MatchStatusType = "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";

export type SetType = {
  set_number?: number | undefined;
  score1?: number | undefined;
  score2?: number | undefined;
  set_status?: "NOT_STARTED" | "IN_PROGRESS" | "FINISHED" | undefined;
};

export type SinglesMatchType = components["schemas"]["SinglesMatchResponse"];

export type DoublesMatchType = components["schemas"]["DoublesMatchResponse"];
