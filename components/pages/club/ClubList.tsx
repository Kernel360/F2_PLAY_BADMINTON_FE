"use client";

import ClubCard from "@/components/club/ClubCard";
import Grid from "@/components/ui/Grid";
import { useGetClubs } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import type { GetClubListData, GetClubListResponse } from "@/types/clubTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

function Club() {
  const { data, fetchNextPage, hasNextPage } = useGetClubs(9, "clubId");

  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {data?.pages.map((group, i) => (
          <React.Fragment key={group.result}>
            {group?.data?.content?.map((project: ClubCardResponse) => (
              <ClubCard key={project.club_token} {...project} />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            // disabled={!hasNextPage || isFetchingNextPage}
          >
            load more
          </button>
        )}
      </Grid>
    </div>
  );
}

export default Club;
