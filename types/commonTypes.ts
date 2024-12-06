import type { ErrorCode } from "./errorCode";

export type Tier = "GOLD" | "SILVER" | "BRONZE" | undefined;

export type MemberRole = "ROLE_USER" | "ROLE_OWNER" | "ROLE_MANAGER";

export type LeagueStatus =
  | "ALL"
  | "RECRUITING"
  | "RECRUITING_COMPLETED"
  | "PLAYING"
  | "CANCELED"
  | "FINISHED";

export type CommonResponse<T> = {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  error_code?: ErrorCode;
  error_message_for_log?: string;
  error_message_for_client?: string;
};

export type CommonPaginationResponse<T> = CommonResponse<{
  content: T[];
  total_pages: number;
  total_elements: number;
  size: number;
  number: number;
  first?: boolean;
  last?: boolean;
  number_of_elements: number;
  empty?: boolean;
}>;
