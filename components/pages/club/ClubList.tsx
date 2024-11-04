"use client";

import ClubCard from "@/components/club/ClubCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Assuming a Shadcn-based Carousel component
import { useGetClubs } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import type { GetClubListData } from "@/types/clubTypes";
import React from "react";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

function ClubList() {
  const { data: topClubs, isLoading: topLoading } = useGetClubs(
    10,
    "popularity",
  );
  const { data: recentClubs, isLoading: recentLoading } = useGetClubs(
    10,
    "recent",
  );
  const { data: newClubs, isLoading: newLoading } = useGetClubs(
    10,
    "createdAt",
  );
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetClubs(
    9,
    "clubId",
  );

  if (topLoading || recentLoading || newLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-2xl font-semibold mb-4">인기 Top 동호회</h2>
        <Carousel>
          {topClubs?.pages[0]?.data?.content?.map((club: ClubCardResponse) => (
            <CarouselItem key={club.club_token}>
              <ClubCard {...club} />
            </CarouselItem>
          ))}
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">최근 활동 Up 동호회</h2>
        <Carousel>
          {recentClubs?.pages[0]?.data?.content?.map(
            (club: ClubCardResponse) => (
              <CarouselItem key={club.club_token}>
                <ClubCard {...club} />
              </CarouselItem>
            ),
          )}
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">신규 동호회</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full relative"
        >
          <CarouselContent>
            {newClubs?.pages[0]?.data?.content?.map(
              (club: ClubCardResponse) => (
                <CarouselItem
                  key={club.club_token}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <ClubCard {...club} />
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <CarouselPrevious className="-left-3 bg-white" />
          <CarouselNext className="-right-3 bg-white" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">전체 동호회 리스트</h2>
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.map((group) => (
            <React.Fragment key={group.data?.number_of_elements}>
              {group?.data?.content?.map((club: ClubCardResponse) => (
                <ClubCard key={club.club_token} {...club} />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ClubList;
