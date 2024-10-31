import {
  type UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

const PAGE_SIZE = 30;

interface CommonResponse<T> {
  result?: "SUCCESS" | "FAIL";
  data?: T;
  error_code?:
    | "BAD_REQUEST"
    | "INVALID_PARAMETER"
    | "INVALID_RESOURCE"
    | "MISSING_PARAMETER"
    | "LIMIT_EXCEEDED"
    | "OUT_OF_RANGE"
    | "FILE_NOT_EXIST"
    | "VALIDATION_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "ACCESS_DENIED"
    | "LIMIT_EXCEEDED_403"
    | "OUT_OF_RANGE_403"
    | "NOT_FOUND"
    | "JWT_COOKIE_NOT_FOUND"
    | "RESOURCE_NOT_EXIST"
    | "MEMBER_NOT_EXIST"
    | "CLUB_NOT_EXIST"
    | "LEAGUE_NOT_EXIST"
    | "BRACKET_NOT_EXIST"
    | "MATCH_NOT_EXIST"
    | "SET_NOT_EXIST"
    | "MEMBER_NOT_JOINED_CLUB"
    | "CLUB_MEMBER_NOT_EXIST"
    | "MATCH_DETAILS_NOT_EXIST"
    | "IMAGE_FILE_NOT_FOUND"
    | "CONFLICT"
    | "ALREADY_EXIST"
    | "CLUB_MEMBER_ALREADY_EXIST"
    | "LEAGUE_RECRUITING_ALREADY_COMPLETED"
    | "CLUB_MEMBER_ALREADY_OWNER"
    | "RESOURCE_ALREADY_EXIST"
    | "CLUB_NAME_ALREADY_EXIST"
    | "LEAGUE_ALREADY_EXIST"
    | "MATCH_ALREADY_EXIST"
    | "MEMBER_ALREADY_JOINED_CLUB"
    | "MEMBER_ALREADY_APPLY_CLUB"
    | "LEAGUE_ALREADY_PARTICIPATED"
    | "LEAGUE_NOT_PARTICIPATED"
    | "LEAGUE_PARTICIPATION_ALREADY_CANCELED"
    | "CLUB_MEMBER_ALREADY_BANNED"
    | "DELETED"
    | "INVALID_PLAYER_COUNT"
    | "LEAGUE_RECRUITING_MUST_BE_COMPLETED_WHEN_BRACKET_GENERATION"
    | "INSUFFICIENT_TIER"
    | "ONGOING_AND_UPCOMING_LEAGUE_CANNOT_BE_PAST"
    | "INTERNAL_SERVER_ERROR"
    | "SERVICE_UNAVAILABLE";
  error_message_for_log?: string;
  error_message_for_client?: string;
}

const useInfiniteQueryWithToast = <TData>(
  queryKey: string[],
  queryFn: ({ pageParam: any }) => Promise<CommonResponse<TData>>,
): UseInfiniteQueryResult => {
  const queryResult = useInfiniteQuery<CommonResponse<TData>>({
    queryKey,
    queryFn,
    // refetchOnWindowFocus: false,
    initialPageParam: {
      page: 0,
      size: PAGE_SIZE,
      sort: "clubId",
    },
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage);
      if (lastPage.data.content.length === 0) {
        return null;
      }

      return {
        page: pages.length,
        size: PAGE_SIZE,
        sort: "clubId",
      };
    },
  });

  if (!queryResult.data) {
    return [];
  }

  const data = queryResult.data.pages.flatMap((page) =>
    page.data ? page.data : [],
  );

  return { ...queryResult, data };
};

export default useInfiniteQueryWithToast;
