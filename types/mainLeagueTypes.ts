import type { components } from "@/schemas/schema";

export type GetMainLeaguesResponse =
  components["schemas"]["CommonResponseCustomPageResponseOngoingAndUpcomingLeagueResponse"];

export type GetMainLeaguesData =
  components["schemas"]["CustomPageResponseOngoingAndUpcomingLeagueResponse"];

export type GetMainLeagues =
  components["schemas"]["OngoingAndUpcomingLeagueResponse"];

export type GetMainLeaguesMatchResponse =
  components["schemas"]["CommonResponseListLeagueSetsScoreInProgressResponse"];

export type GetMainLeaguesMatchData =
  components["schemas"]["LeagueSetsScoreInProgressResponse"];
