"use client";

import ClubCard from "@/components/club/ClubCard";
import ClubCarousel from "@/components/club/ClubCarousel";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useGetMembersMyClubs } from "@/lib/api/hooks/memberHook";
import type { components } from "@/schemas/schema";
import Autoplay from "embla-carousel-autoplay";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

type ClubCardResponse = components["schemas"]["ClubCardResponse"];

const imageUrl = [
  "/images/banner-rules.png",
  "/images/banner-process.png",
  "/images/banner-polite.png",
  "/images/banner-match.png",
];

function ClubList() {
  const { data: myClubs, isLoading: myClubLoading } = useGetMembersMyClubs();
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

  if (
    myClubLoading ||
    topLoading ||
    activityLoading ||
    recentlyLoading ||
    isLoading
  ) {
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
                  src={`${url}`}
                  alt={`banner ${index + 1}`}
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
        <div className="mb-4 flex gap-2 items-center">
          <h2 className="text-xl font-bold mb-6 text-gray-800">내 동호회</h2>
          <Link className="text-sm text-gray-500" href={"/my-page"}>
            더보기
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Link href={"/club/create"} className="block">
            <Card className="h-full w-full rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200 border border-gray-200 bg-white flex flex-col justify-center items-center">
              <CardHeader className="p-0 flex justify-center items-center bg-gray-50 rounded-full w-16 h-16 mx-auto mt-6">
                <span className="text-3xl text-gray-600">+</span>
              </CardHeader>
              <CardContent className="px-5 py-4 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-600 text-center">
                  새 동호회를 만들어보세요!
                </p>
              </CardContent>
            </Card>
          </Link>

          {myClubs?.slice(0, 3).map((club) => (
            <ClubCard key={club.club_token} {...club} />
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
        <ClubCarousel clubs={topClubs || []} />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            놓치면 아쉬운 동호회{" "}
            <span className="text-sm text-primary">FOCUS</span>
          </h2>
          <p className="text-sm text-gray-500">
            활발한 활동으로 주목받고 있는 동호회를 확인해보세요
          </p>
        </div>
        <ClubCarousel clubs={activityClubs || []} />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            따끈따끈한 신규 동호회{" "}
            <span className="text-sm text-green-500">NEW</span>
          </h2>
          <p className="text-sm text-gray-500">
            새롭게 만들어진 신생 동호회들을 만나보세요
          </p>
        </div>
        <ClubCarousel clubs={recentlyClubs || []} />
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
          <div className="w-full flex justify-center items-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              className="mt-4 px-6 py-2 font-semibold rounded-lg duration-300 shadow-md hover:shadow-lg focus:ring-2"
            >
              더보기
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default ClubList;
