"use client";

import ClubCard from "@/components/club/ClubCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  useGetActivityClubs,
  useGetClubs,
  useGetPopularClubs,
  useGetRecentlyClubs,
} from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import React from "react";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

function ClubList() {
  const { data: topClubs, isLoading: topLoading } = useGetPopularClubs();
  const { data: activityClubs, isLoading: activityLoading } =
    useGetActivityClubs();
  const { data: recentlyClubs, isLoading: recentlyLoading } =
    useGetRecentlyClubs();
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetClubs(
    9,
    "clubId",
  );

  if (topLoading || activityLoading || recentlyLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <span className="text-lg text-gray-700">Loading...</span>
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
    <div className="space-y-16 py-6">
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          인기 Top 동호회
        </h2>
        <p className="text-sm text-gray-500">
          많은 회원들이 활동 중인 인기 동호회를 소개합니다.
        </p>
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent className="gap-4">
            {topClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg shadow-sm  transition-shadow"
              >
                <ClubCard {...club} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 bg-white" />
          <CarouselNext className="-right-3 bg-white" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          최근 활동 Up 동호회
        </h2>
        <p className="text-sm text-gray-500">
          최근 활발히 활동 중인 동호회를 확인하세요.
        </p>
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent className="gap-4">
            {activityClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg shadow-sm  transition-shadow"
              >
                <ClubCard {...club} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 bg-white" />
          <CarouselNext className="-right-3 bg-white" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">신규 동호회</h2>
        <p className="text-sm text-gray-500">
          새롭게 만들어진 동호회들을 만나보세요.
        </p>
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent className="gap-4">
            {recentlyClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg shadow-sm  transition-shadow"
              >
                <ClubCard {...club} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 bg-white" />
          <CarouselNext className="-right-3 bg-white" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          전체 동호회 리스트
        </h2>
        <p className="text-sm text-gray-500">
          다양한 분야의 동호회 목록을 한눈에 확인하세요.
        </p>
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.map((group) => (
            <React.Fragment key={group.data?.number_of_elements}>
              {group?.data?.content?.map((club: ClubCardResponse) => (
                <ClubCard key={club.club_token} {...club} />
              ))}
            </React.Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="mt-4 px-6 py-2 font-semibold rounded-lg"
            >
              더보기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default ClubList;
