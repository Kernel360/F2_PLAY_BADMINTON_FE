"use client";

import ClubCard from "@/components/club/ClubCard";
import Grid from "@/components/ui/Grid";
import { useGetClubs } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

function Club() {
  const { data, isLoading } = useGetClubs();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다. </div>;
  }

  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {data.content?.map((club: ClubCardResponse) => (
          <ClubCard key={club.club_id} {...club} />
        ))}
      </Grid>
    </div>
  );
}

export default Club;
