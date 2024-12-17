import type { CommonPaginationResponse } from "@/types/commonTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

interface useInfiniteQueryReturnFlattenDataProps {
  enabled?: boolean; // enabled 옵션을 옵셔널로 추가
}

const useInfiniteQueryReturnFlattenData = <TData>(
  queryKey: (string | number)[],
  queryFn: ({
    pageParam,
  }: { pageParam: unknown }) => Promise<CommonPaginationResponse<TData>>,
  initialPageParam: number,
  options?: useInfiniteQueryReturnFlattenDataProps,
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
    enabled: options?.enabled ?? true,
  });

  const flattenData = data
    ? data.pages.flatMap((page) => {
        return page.data ? page.data.content : [];
      })
    : [];

  return { data: flattenData, isLoading, fetchNextPage, hasNextPage };
};

export default useInfiniteQueryReturnFlattenData;
