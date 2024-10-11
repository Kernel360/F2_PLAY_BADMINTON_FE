"use client";

import { ClubCard } from "@/components/clubs/ClubCard";
import Grid from "@/components/ui/Grid";
import { useGetClubs } from "@/lib/api/hooks/clubHook";

interface ClubList {
  club_id: number;
  club_name: string;
  club_description: string;
  club_image: string;
  created_at: string; // ISO 형식의 날짜 문자열
  modified_at: string; // ISO 형식의 날짜 문자열
  tier_counts: {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
  };
}

export default function page() {
  const { data, error, isLoading } = useGetClubs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    // TODO: 에러 메시지
    return <div>No data available</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {data.map((club) => (
          <ClubCard key={club.club_id} {...club} />
        ))}
      </Grid>
    </div>
  );
}
