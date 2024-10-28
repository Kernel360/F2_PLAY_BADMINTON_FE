"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { format, getDaysInMonth, getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";

function Page() {
  const today = new Date();

  const currentYear = getYear(today);
  const currentMonth = getMonth(today);

  const getAllDatesInMonthWithDay = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const datesWithDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = format(date, "E", { locale: ko });
      datesWithDays.push({
        date: date,
        dayOfWeek: dayOfWeek,
        dayIndex: date.getDay(), // 0: 일요일, 6: 토요일
        id: i,
      });
    }

    return datesWithDays;
  };

  const dates = getAllDatesInMonthWithDay(currentYear, currentMonth);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-1">
          {dates.map((dateObj, index) => {
            const isCurrent = current === dateObj.id;

            return (
              <CarouselItem
                key={dateObj.id}
                className={`pl-1 md:basis-1/2 lg:basis-1/6 cursor-pointer ${isCurrent ? "bg-primary" : ""}`}
              >
                <div className="p-1">
                  <div className="w-32 flex flex-col justify-center items-center">
                    <span className={isCurrent ? "text-white" : ""}>
                      {format(dateObj.date, "d")}
                    </span>
                    <span className={isCurrent ? "text-white" : ""}>
                      {dateObj.dayOfWeek}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-4">{current}</div>
    </div>
  );
}

export default Page;
