"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addDays, format, getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

interface MonthlyDateCarouselProps {
  onDateSelect?: (date: Date) => void;
}

export default function MonthlyDateCarousel({
  onDateSelect,
}: MonthlyDateCarouselProps = {}) {
  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateSelect?.(date);
    },
    [onDateSelect],
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const getDatesForNextThreeWeeks = (startDate: Date) => {
    const endDate = addDays(startDate, 20);
    const datesWithDays = [];

    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      const dayOfWeek = format(date, "E", { locale: ko });
      datesWithDays.push({
        date: date,
        dayOfWeek: dayOfWeek,
        dayIndex: date.getDay(),
        id: date.getDate(),
      });
    }

    return datesWithDays;
  };

  const dates = getDatesForNextThreeWeeks(today);

  return (
    <section
      className="w-full sticky top-[4rem] z-10 bg-white mb-5"
      aria-label="Monthly Date Carousel"
    >
      {/* <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {format(selectedDate, "MMMM dd yyyy", { locale: ko })}
        </h2>
      </header> */}
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          aria-roledescription="carousel"
        >
          <CarouselPrevious
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 hover:text-primary rounded-full p-2 z-10"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} className="text-indigo-600" />
          </CarouselPrevious>
          <CarouselContent className="flex items-center gap-2 p-4">
            {dates.map((date) => {
              let textColor = "text-gray-600";
              let dateStyles =
                "cursor-pointer transition-all duration-200 transform rounded-full w-28 h-14 flex flex-col items-center justify-center";

              if (selectedDate.toDateString() === date.date.toDateString()) {
                dateStyles +=
                  " bg-blue-500 text-white scale-105 border-2 border-blue-500";
                textColor = "text-white";
              } else {
                if (date.dayIndex === 0) {
                  textColor = "text-red-500"; // Sunday
                  // dateStyles += " text-red-500"; // 전체 요소도 빨간색
                } else if (date.dayIndex === 6) {
                  textColor = "text-blue-500"; // Saturday
                  // dateStyles += " text-blue-500"; // 전체 요소도 파란색
                }
              }

              const handleKeyUp = (event: React.KeyboardEvent, date: Date) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleDateSelect(date);
                }
              };

              return (
                <CarouselItem
                  key={date.date.toISOString()}
                  className="flex-none basis-1/6"
                >
                  <button
                    className={`${dateStyles} ${textColor}`}
                    onClick={() => handleDateSelect(date.date)}
                    onKeyUp={(event) => handleKeyUp(event, date.date)}
                    aria-label={`Select date ${format(
                      date.date,
                      "MMMM d, yyyy",
                      { locale: ko },
                    )}`}
                    type="button"
                  >
                    <div className="flex flex-col items-center justify-center p-0">
                      <span className={`text-sm font-medium ${textColor}`}>
                        {format(date.date, "EEE", { locale: ko })}
                      </span>
                      <span className="text-xl font-bold">
                        {format(date.date, "d")}
                      </span>
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselNext
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 hover:text-primary rounded-full p-2 z-10"
            aria-label="Next month"
          >
            <ChevronRight size={18} className="text-indigo-600" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}
