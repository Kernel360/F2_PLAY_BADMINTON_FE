"use client";

import { ClubCard } from "@/components/clubs/ClubCard";
import Grid from "@/components/ui/Grid";
import { useQuery } from "@tanstack/react-query";

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
  // WARN: 해당 작업은 임시 코드입니다.
  const { data, error, isLoading } = useQuery({
    queryKey: ["clubsData"],
    queryFn: async () => {
      const response = await fetch("https://api.badminton.run/v1/clubs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키를 포함한 요청이 필요하면 설정
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  });

  const ClubList: ClubList[] = data || [];

  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {error ? (
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : ClubList.length > 0 ? (
          ClubList.map((club) => <ClubCard key={club.club_id} {...club} />)
        ) : (
          <div>No data available</div>
        )}
      </Grid>
    </div>
  );
}
