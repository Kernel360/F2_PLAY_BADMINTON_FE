"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { usePostLeagues } from "@/lib/api/hooks/leagueHook";
import type {
  GetLeagueDetailData,
  LeagueCreateRequest,
  LeagueUpdateRequest,
  TierLimit,
} from "@/types/leagueTypes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { endOfDay } from "date-fns";
import { format, formatISO, setHours, setMinutes } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Award,
  Calendar as CalendarIcon,
  MapPin,
  Milestone,
  PencilLine,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type LeagueFormRequest =
  | (LeagueCreateRequest & { mode: "create" })
  | (LeagueUpdateRequest & { mode: "update" });

interface LeagueFormProps {
  clubId: string;
  leagueId?: string;
  initialData?: GetLeagueDetailData;
}

function LeagueForm(props: LeagueFormProps) {
  const { clubId, leagueId, initialData } = props;

  const router = useRouter();

  const [tierLimit, setTierLimit] = useState<TierLimit>("GOLD");
  const [type, setType] =
    useState<LeagueCreateRequest["match_type"]>("SINGLES");
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");
  const [closedAt, setClosedAt] = useState<string>("");

  const { mutate: createLeague } = usePostLeagues(clubId);

  // const { mutate: updateLeague } = usePatchLeague(clubId, leagueId);
  const { register, handleSubmit, setValue } = useForm<LeagueFormRequest>({
    mode: "onBlur",
    defaultValues: {
      mode: initialData ? "update" : "create",
      ...initialData,
    },
  });

  // useEffect(() => {
  //   if (initialData) {
  //     setValue("mode", "update");
  //   } else {
  //     setValue("mode", "create");
  //   }
  // }, [initialData, setValue]);
  console.log("initialData: ", initialData);
  useEffect(() => {
    if (initialData) {
      console.log("initialData loaded:", initialData);
      setValue("league_name", initialData.league_name || "");
      setValue("description", initialData.league_description || "");
      setValue("full_address", initialData.full_address || "");
      setTierLimit(initialData.required_tier || "GOLD");
      setType(initialData.match_type || "SINGLES");
      setValue("tier_limit", initialData.required_tier || "GOLD");
      setValue("match_type", initialData.match_type || "SINGLES");
      setValue("league_at", initialData.league_at || "");

      if (initialData.league_at) {
        const leagueDate = new Date(initialData.league_at);
        setDate(leagueDate);
        setTimeValue(format(leagueDate, "HH:mm"));
        setValue("league_at", initialData.league_at);
      }

      if (initialData.recruiting_closed_at) {
        setClosedAt(initialData.recruiting_closed_at);
      }

      setValue("player_limit_count", initialData.player_limit_count || 0);
      setValue("recruiting_closed_at", initialData.recruiting_closed_at || "");
    }
  }, [initialData, setValue]);

  const toLocalISOString = (date: Date): string => {
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    return `${formattedDate}.000`;
  };

  const handleLeagueTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (!date) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map(Number);
    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const newDate = setHours(setMinutes(date, minutes ?? 0), hours ?? 0);
      setDate(newDate);
      setValue("league_at", toLocalISOString(newDate), {
        shouldValidate: true,
      });
      setTimeValue(time);
    }
  };

  const handleLeagueDaySelect = (selectedDate: Date) => {
    const [hours, minutes] = timeValue.split(":").map(Number);
    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const newDate = setHours(
        setMinutes(selectedDate, minutes ?? 0),
        hours ?? 0,
      );
      setDate(newDate);
      setValue("league_at", toLocalISOString(newDate), {
        shouldValidate: true,
      });
    }
  };

  const handleClosedAtSelect = (selectedDate: Date) => {
    const closingDate = endOfDay(selectedDate);
    setClosedAt(formatISO(closingDate));
    setValue("recruiting_closed_at", toLocalISOString(closingDate), {
      shouldValidate: true,
    });
  };

  const selectedTier = () => {
    setValue("tier_limit", tierLimit, { shouldValidate: true });
    return tierLimit === "GOLD"
      ? "🥇 골드"
      : tierLimit === "SILVER"
        ? "🥈 실버"
        : "🥉 브론즈";
  };

  const selectedType = () => {
    setValue("match_type", type, { shouldValidate: true });
    return type === "SINGLES" ? "단식" : "복식";
  };

  const handleSumbitSchedule = (data: LeagueFormRequest) => {
    console.log(data.mode);
    if (data.mode === "create") {
      const newScheduleData: LeagueCreateRequest = {
        ...data,
        match_generation_type: "FREE",
        league_status: "ALL",
      };
      console.log(newScheduleData);
      createLeague(newScheduleData, {
        onSuccess: () => {
          router.push(`/club/${clubId}/league`);
        },
      });
    } else if (data.mode === "update") {
      const updatedScheduleData: LeagueUpdateRequest = {
        ...data,
        // match_generation_type: "RANDOM",
      };
      // updateLeague(updatedScheduleData, {
      //   onSuccess: () => {
      //     router.push(`/club/${clubId}/league`);
      //   },
      // });
    }
  };

  return (
    <form
      className="w-full flex flex-auto flex-col gap-5"
      onSubmit={handleSubmit(handleSumbitSchedule)}
      method="post"
    >
      <div>
        <div className="flex gap-2 mb-4 items-center">
          <Milestone className="text-gray-500" size={24} />
          <Text size="lg" className="block text-gray-600">
            경기 이름
          </Text>
        </div>

        <Input
          placeholder="경기 이름을 입력하세요"
          defaultValue={initialData?.league_name}
          {...register("league_name", {
            //   required: "경기 이름을 입력해주세요",
          })}
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
          placeholder="경기 설명을 입력하세요"
          className="resize-none text-black"
          {...register("description", {
            required: "경기 설명을 입력해주세요",
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-8">
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
                {date
                  ? format(date, "yyyy-MM-dd a hh시 mm분")
                  : "경기 시간 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md">
              <input
                type="time"
                value={timeValue}
                onChange={handleLeagueTimeChange}
                className="text-black w-full"
              />
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate) handleLeagueDaySelect(selectedDate);
                }}
                locale={ko}
                className="text-black"
              />
            </PopoverContent>
          </Popover>
          <input
            type="hidden"
            {...register("league_at", {
              required: "경기 시간을 선택해주세요",
            })}
          />
        </div>

        <div>
          <div className="flex gap-2 mb-4 items-center">
            <Users className="text-gray-500" size={20} />
            <Text size="lg" color="black">
              경기 타입
            </Text>
          </div>
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full hover:bg-white hover:text-black text-black text-left p-2 flex items-center justify-between border-gray-200 rounded-md"
                >
                  <span className="flex items-center">{selectedType()}</span>
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
                    <title>경기 타입 선택하기</title>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full p-2 border border-gray-200 bg-white rounded-md shadow-lg">
                <DropdownMenuRadioGroup
                  value={tierLimit}
                  onValueChange={(value) =>
                    setType(value as LeagueUpdateRequest["match_type"])
                  }
                  className="w-full"
                >
                  <DropdownMenuRadioItem
                    value="SINGLES"
                    className="flex items-center p-2 cursor-pointer text-black w-full "
                  >
                    단식
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="DOUBLES"
                    className="flex items-center p-2 w-full cursor-pointer text-black"
                  >
                    복식
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              type="hidden"
              {...register("match_type", {
                //   required: "경기 타입을 선택해주세요",
              })}
            />
          </div>
        </div>
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
                    setTierLimit(value as "GOLD" | "SILVER" | "BRONZE")
                  }
                  className="w-full"
                >
                  <DropdownMenuRadioItem
                    value="GOLD"
                    className="flex items-center p-2 cursor-pointer text-black w-full "
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
            <input
              type="hidden"
              {...register("tier_limit", {
                //   required: "지원 가능 티어를 선택해주세요",
              })}
            />
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
            placeholder="모집 인원 입력"
            {...register("player_limit_count", {
              // required: "모집 인원을 입력해주세요",
            })}
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
            placeholder="장소 입력"
            {...register("full_address", {
              // required: "경기 장소를 입력해주세요",
            })}
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
                onSelect={(date) => date && handleClosedAtSelect(date)}
                locale={ko}
                className="text-black"
              />
            </PopoverContent>
          </Popover>

          <input
            type="hidden"
            {...register("recruiting_closed_at", {
              // required: "모집 마감 날짜를 선택해주세요",
            })}
          />
        </div>
      </div>

      <div className="flex justify-center pt-8 gap-4">
        <Button size="lg" className="w-1/4 p-3 font-semibold">
          {initialData ? "경기 수정" : "경기 생성"}
        </Button>
      </div>
    </form>
  );
}

export default LeagueForm;
