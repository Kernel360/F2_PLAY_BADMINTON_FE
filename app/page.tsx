"use client";

import DayCell from "@/components/DayCell";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import * as React from "react";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={ko}
        className="rounded-md text-gray-800"
        classNames={{
          head_cell: "w-[80px]",
          cell: "h-[80px] w-[80px] hover:rounded-md cursor-pointer flex justify-center items-center hover:bg-primary/10",
          day: "hover:bg-inherit hover:text-inherit h-[80px] w-[80px] flex justify-center items-center",
          day_selected:
            "w-full border border-primary bg-inherit text-primary hover:bg-inherit hover:text-inherit",
          day_today: "hover: bg-inherit",
        }}
        components={{
          DayContent: DayCell,
        }}
      />
    </div>
  );
}
