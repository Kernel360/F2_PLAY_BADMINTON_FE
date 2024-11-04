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
import Autoplay from "embla-carousel-autoplay";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

const imageUrl = [
  "/images/banner-rules.png",
  "/images/banner-process.png",
  "/images/dummy-image.jpg",
  "/images/dummy-image.jpg",
  "/images/dummy-image.jpg",
];

function ClubList() {
  const { data: topClubs, isLoading: topLoading } = useGetPopularClubs();
  const { data: activityClubs, isLoading: activityLoading } =
    useGetActivityClubs();
  const { data: recentlyClubs, isLoading: recentlyLoading } =
    useGetRecentlyClubs();
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetClubs(
    12,
    "clubId",
  );

  const [api, setApi] = useState<UseEmblaCarouselType[1]>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (topLoading || activityLoading || recentlyLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {imageUrl.map((url, index) => (
              <CarouselItem key={url} className="w-full h-[346px]">
                <img
                  src={`${url}`} // 실제 이미지 경로로 대체 필요
                  alt={`슬라이드 ${index + 1}`}
                  className="w-[1048px] h-[346px] object-fit rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center space-x-2 mt-4 gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              type="button"
              key={`dots-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === current ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            인기 Top 동호회 <span className="text-sm text-red-500">HOT!</span>
          </h2>
          <p className="text-sm text-gray-500">
            많은 사랑을 받는 인기 동호회를 확인해보세요
          </p>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent>
            {topClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg "
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
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            놓치면 아쉬운 동호회{" "}
            <span className="text-sm text-primary">TREND</span>
          </h2>
          <p className="text-sm text-gray-500">
            활발한 활동으로 주목받고 있는 동호회를 확인해보세요
          </p>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full relative">
          <CarouselContent>
            {activityClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg "
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
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            따끈따끈한 신규 동호회{" "}
            <span className="text-sm text-orange-500">NEW</span>
          </h2>
          <p className="text-sm text-gray-500">
            새롭게 만들어진 신생 동호회들을 만나보세요
          </p>
        </div>
        <Carousel className="w-full relative">
          <CarouselContent>
            {recentlyClubs?.map((club: ClubCardResponse) => (
              <CarouselItem
                key={club.club_token}
                className="md:basis-1/3 lg:basis-1/4 p-2 rounded-lg"
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
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">전체 동호회</h2>
        </div>
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
