import type { CommonPaginationResponse } from "@/types/commonTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteQueryReturnFlattenData = <TData>(
  queryKey: (string | number)[],
  queryFn: ({
    pageParam,
  }: { pageParam: unknown }) => Promise<CommonPaginationResponse<TData>>,
  initialPageParam: number,
) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    CommonPaginationResponse<TData>
  >({
    queryKey,
    queryFn,
    initialPageParam,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage?.data?.last ? pages.length : null;
    },
  });

  const flattenData = data
    ? data.pages.flatMap((page) => {
        return page.data ? page.data.content : [];
      })
    : [];

  return { data: flattenData, isLoading, fetchNextPage, hasNextPage };
};

export default useInfiniteQueryReturnFlattenData;
