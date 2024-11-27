import ClubCard from "@/components/club/ClubCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ClubCardResponse } from "@/types/clubTypes";
import type React from "react";

interface ClubCarouselProps {
  clubs: ClubCardResponse[];
}

function ClubCarousel(clubs: ClubCarouselProps) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full relative">
      <CarouselContent>
        {clubs.clubs.map((club) => (
          <CarouselItem
            key={club.club_token}
            className="md:basis-1/3 lg:basis-1/4"
          >
            <ClubCard {...club} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-3 bg-white" />
      <CarouselNext className="absolute -right-3 bg-white" />
    </Carousel>
  );
}

export default ClubCarousel;
