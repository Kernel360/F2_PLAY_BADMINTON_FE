"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format, formatISO, setHours, setMinutes } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Award,
  Calendar as CalendarIcon,
  MapPin,
  Milestone,
  PencilLine,
  User,
} from "lucide-react";
import { useState } from "react";

interface League {
  leagueName: string;
  description: string;
  tierLimit: "GOLD" | "SILVER" | "BRONZE";
  status: "OPEN" | "CLOSED";
  matchType: "SINGLE" | "DOUBLES";
  leagueAt: string;
  closedAt: string;
  playerCount: number;
  currentApplicants: number;
  location: string;
  createdAt: string;
  modifiedAt: string;
  matchingRequirement: string;
}

function CreateLeaguePage() {
  const [leagueName, setLeagueName] = useState("");
  const [description, setDescription] = useState("");
  const [tierLimit, setTierLimit] = useState<League["tierLimit"]>("GOLD");
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");
  const [closedAt, setClosedAt] = useState<string>("");
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [location, setLocation] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (!date) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map(Number);
    if (
      typeof hours === "number" &&
      !Number.isNaN(hours) &&
      typeof minutes === "number" &&
      !Number.isNaN(minutes)
    ) {
      const newDate = setHours(setMinutes(date, minutes), hours);
      setDate(newDate);
    }
    setTimeValue(time);
  };

  const handleDaySelect = (selectedDate: Date) => {
    if (!timeValue || !selectedDate) {
      setDate(selectedDate);
      return;
    }
    const [hours, minutes] = timeValue.split(":").map(Number);
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes,
    );
    setDate(newDate);
  };

  const selectedTier = () => {
    if (tierLimit === "GOLD") return "🥇 골드";
    if (tierLimit === "SILVER") return "🥈 실버";
    return "🥉 브론즈";
  };

  return (
    <div className="container mx-auto bg-white rounded-lg space-y-6 ">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">경기 생성</h2>
      </div>

      <div>
        <div className="flex gap-2 mb-4 items-center">
          <Milestone className="text-gray-500" size={24} />
          <Text size="lg" className="block text-gray-600">
            경기 이름
          </Text>
        </div>
        <Input
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          placeholder="경기 이름을 입력하세요"
        />
      </div>

      <div>
        <div className="flex gap-2 mb-4 items-center">
          <PencilLine className="text-gray-500" size={24} />
          <Text size="lg" className="block  text-gray-600">
            경기 설명
          </Text>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="경기 설명을 입력하세요"
          className="resize-none text-black"
        />
      </div>

      <div>
        <div className="flex gap-2 mb-4 items-center">
          <CalendarIcon className="text-gray-500" size={24} />
          <Text size="lg" className="block text-gray-600">
            경기 시간
          </Text>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-left p-3 text-black hover:bg-white hover:text-black"
            >
              {date ? format(date, "yyyy-MM-dd a hh시 mm분") : "경기 시간 선택"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md">
            <input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="text-black w-full"
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) handleDaySelect(selectedDate);
              }}
              locale={ko}
              className="text-black"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-8">
        <div>
          <div className="flex gap-2 mb-4 items-center">
            <Award className="text-gray-500" size={20} />
            <Text size="lg" color="black">
              지원 가능 티어
            </Text>
          </div>
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full hover:bg-white hover:text-black text-black text-left p-2 flex items-center justify-between border-gray-200 rounded-md"
                >
                  <span className="flex items-center">{selectedTier()}</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                    <title>최소 티어 선택하기</title>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full p-2 border border-gray-200 bg-white rounded-md shadow-lg">
                <DropdownMenuRadioGroup
                  value={tierLimit}
                  onValueChange={(value) =>
                    setTierLimit(value as League["tierLimit"])
                  }
                >
                  <DropdownMenuRadioItem
                    value="GOLD"
                    className="flex items-center p-2 cursor-pointer text-black"
                  >
                    🥇 골드
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="SILVER"
                    className="flex items-center p-2 w-full cursor-pointer text-black"
                  >
                    🥈 실버
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="BRONZE"
                    className="flex items-center p-2 w-full cursor-pointer text-black"
                  >
                    🥉 브론즈
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <div className="flex gap-2 mb-4 items-center">
            <User className="text-gray-500" size={20} />
            <Text size="lg" className="block">
              모집 인원
            </Text>
          </div>
          <Input
            type="number"
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            placeholder="모집 인원 입력"
          />
        </div>

        <div className="w-full">
          <div className="flex gap-2 mb-4 items-center">
            <MapPin className="text-gray-500" size={24} />
            <Text size="lg" className="block text-gray-600">
              경기 장소
            </Text>
          </div>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="장소 입력"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-4 items-center">
            <CalendarIcon className="text-gray-500" size={24} />
            <Text size="lg" className="block text-gray-600">
              모집 마감 날짜
            </Text>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-left p-3  text-black hover:bg-white hover:text-black"
              >
                {closedAt
                  ? format(new Date(closedAt), "yyyy-MM-dd")
                  : "모집 마감 날짜 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md">
              <Calendar
                mode="single"
                selected={closedAt ? new Date(closedAt) : undefined}
                onSelect={(date) => setClosedAt(date ? formatISO(date) : "")}
                locale={ko}
                className="text-black"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-center pt-8 gap-4">
        <Button size="lg" className="w-1/4 p-3 font-semibold">
          경기 생성
        </Button>
      </div>
    </div>
  );
}

export default CreateLeaguePage;
