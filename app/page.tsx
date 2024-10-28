"use client";

import DateCarousel from "@/components/DayCarousel";
import { Button } from "@/components/ui/Button";

function App() {
  const handleDateSelect = (date: Date) => {
    console.log("Selected date:", date);
  };
  return (
    <div className="p-4 w-full">
      <DateCarousel onDateSelect={handleDateSelect} />
      <div>
        <div className="w-full flex justify-between">
          <div>11:00</div>
          <div>
            <div>서울 영등포 EA SPORTS FC(더에프필드) A구장 *주차마감*</div>
            <div>남녀모두 6vs6</div>
          </div>
          <Button variant="destructive">마감임박</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
