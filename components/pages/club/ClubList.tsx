"use client";

import ClubCard from "@/components/club/ClubCard";
import Grid from "@/components/ui/Grid";
import { useGetClubs } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

function Club() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetClubs();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다. </div>;
  }

  console.log(data);

  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {data.map((page) => {
          return page.content.map((club: ClubCardResponse) => {
            return <ClubCard key={club.club_token} {...club} />;
          });
        })}
      </Grid>

      {hasNextPage && (
        <button type="button" onClick={() => fetchNextPage()}>
          load more
        </button>
      )}
    </div>
  );
}

export default Club;
