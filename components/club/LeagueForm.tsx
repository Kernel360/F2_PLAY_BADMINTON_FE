"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePatchLeague, usePostLeague } from "@/lib/api/hooks/leagueHook";
import type {
  GetLeagueDetailData,
  PatchLeagueRequest,
  PostLeagueRequest,
} from "@/types/leagueTypes";
import { zodResolver } from "@hookform/resolvers/zod";
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
  GitCompare,
  MapPin,
  Milestone,
  PencilLine,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Path, UseFormSetValue } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type LeagueFormRequest =
  | (PostLeagueRequest & { mode: "create" })
  | (PatchLeagueRequest & { mode: "update" });

interface LeagueFormProps {
  clubId: string;
  leagueId?: string;
  initialData?: GetLeagueDetailData;
}

const leagueFormSchema = z
  .object({
    league_name: z
      .string()
      .min(2, { message: "경기 이름은 최소 2글자 이상이어야 합니다." })
      .max(20, { message: "경기 이름은 최대 20글자 이하로 입력해주세요." }),
    description: z
      .string()
      .min(2, "경기 설명은 최소 2글자 이상이어야 합니다.")
      .max(1000, "경기 설명은 최대 1000글자 이하로 입력해주세요."),
    full_address: z
      .string()
      .min(2, "경기 장소는 최소 2글자 이상이어야 합니다.")
      .max(100, "경기 장소는 최대 100글자 이하로 입력해주세요."),
    tier_limit: z.enum(["BRONZE", "SILVER", "GOLD"], {
      required_error: "지원 가능한 티어를 선택해주세요.",
    }),
    match_type: z.enum(["SINGLES", "DOUBLES"], {
      required_error: "경기 타입을 선택해주세요.",
    }),
    league_at: z.string().refine((date) => new Date(date) > new Date(), {
      message: "경기 시작 날짜는 현재 시간보다 뒤에 설정되어야 합니다.",
    }),
    recruiting_closed_at: z
      .string()
      .refine((date) => new Date(date) > new Date(), {
        message: "모집 마감 날짜는 현재 시간보다 뒤에 설정되어야 합니다.",
      }),
    player_limit_count: z
      .number()
      .int("참가 인원은 정수여야 합니다.")
      .min(2)
      .max(100),
    match_generation_type: z.enum(["FREE", "TOURNAMENT"], {
      required_error: "대진표 타입을 선택해주세요.",
    }),
  })
  .superRefine((data, ctx) => {
    const { player_limit_count, match_type } = data;

    if (
      match_type === "SINGLES" &&
      !Number.isInteger(Math.log2(player_limit_count))
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["player_limit_count"],
        message: "참가인원: 토너먼트 싱글이면 2의 제곱이어야 합니다.",
      });
    } else if (
      match_type === "DOUBLES" &&
      !Number.isInteger(Math.log2(player_limit_count / 2))
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["player_limit_count"],
        message:
          "참가인원: 토너먼트 더블이면 참가자수 / 2 가 2의 제곱이어야 합니다.",
      });
    }
  });

function LeagueForm(props: LeagueFormProps) {
  const { clubId, leagueId, initialData } = props;
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");
  const [closedAt, setClosedAt] = useState<string>("");

  const { mutate: createLeague } = usePostLeague(clubId);

  const { mutate: updateLeague } = usePatchLeague(
    clubId as string,
    leagueId as string,
  );

  const form = useForm<LeagueFormRequest>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      mode: initialData ? "update" : "create",
      description: initialData?.league_description,
      tier_limit: initialData?.required_tier,
      ...initialData,
    },
  });

  const handleSumbitSchedule = (data: LeagueFormRequest) => {
    if (!initialData) {
      data.mode = "create";
    }
    if (data.mode === "create") {
      createLeague(
        { ...data, league_status: "RECRUITING" },
        {
          onSuccess: () => router.push(`/club/${clubId}/league`),
        },
      );
    } else {
      updateLeague(data, {
        onSuccess: () => router.push(`/club/${clubId}/league`),
      });
    }
  };

  const handleLeagueTimeChange = (
    time: string,
    setValue: UseFormSetValue<LeagueFormRequest>,
    fieldName: Path<LeagueFormRequest>,
  ) => {
    if (!date) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map(Number);
    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const newDate = setHours(setMinutes(date, minutes ?? 0), hours ?? 0);
      setDate(newDate);
      setTimeValue(time);
      setValue(fieldName, newDate.toISOString()); // Update the form field value
    }
  };

  const handleClosedAtSelect = (
    selectedDate: Date,
    setValue: UseFormSetValue<LeagueFormRequest>,
    fieldName: Path<LeagueFormRequest>,
  ) => {
    const closingDate = endOfDay(selectedDate);
    setClosedAt(formatISO(closingDate));
    setValue(fieldName, closingDate.toISOString()); // Update the form field value
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSumbitSchedule)}
        className="space-y-4 w-full flex flex-auto flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="league_name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 mb-4 items-center">
              <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                <Milestone className="text-gray-500" size={20} />
                경기 이름
              </FormLabel>
              <FormControl>
                <Input placeholder="경기 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 mb-4 items-center ">
              <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                <PencilLine className="text-gray-500" size={20} />
                경기 설명
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="경기 설명을 입력하세요"
                  {...field}
                  className="resize-none text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 gap-y-8">
          <FormField
            control={form.control}
            name="league_at"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <CalendarIcon className="text-gray-500" size={20} />
                  경기 시간
                </FormLabel>

                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild disabled={!!initialData}>
                      <Button
                        variant="outline"
                        className="w-full text-left p-3 text-black hover:bg-white hover:text-black"
                      >
                        {field.value
                          ? format(
                              field.value,
                              "yyyy년 MM월 dd일 a hh시 mm분",
                              {
                                locale: ko,
                              },
                            )
                          : "경기 시간 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md">
                      <Input
                        type="time"
                        value={timeValue}
                        onChange={(e) =>
                          handleLeagueTimeChange(
                            e.target.value,
                            form.setValue,
                            "league_at",
                          )
                        }
                        className="mt-2 flex-1"
                      />
                      <Calendar
                        mode="single"
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate(selectedDate);
                            form.setValue(
                              "league_at",
                              selectedDate.toISOString(),
                            );
                          }
                        }}
                        locale={ko}
                        className="text-black"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="match_type"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <Users className="text-gray-500" size={20} />
                  경기 타입
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-black text-left flex items-center justify-between border-gray-200 rounded-md hover:bg-white hover:text-black">
                      <SelectValue placeholder="경기 타입 선택하기" />
                    </SelectTrigger>
                    <SelectContent className="w-full border cursor-pointer border-gray-200 bg-white rounded-md shadow-lg">
                      <SelectItem
                        value="SINGLES"
                        className="flex items-center text-black cursor-pointer"
                      >
                        단식
                      </SelectItem>
                      <SelectItem
                        value="DOUBLES"
                        className="flex items-center text-black cursor-pointer"
                      >
                        복식
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tier_limit"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <Award className="text-gray-500" size={20} />
                  지원 가능 티어
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!!initialData}
                  >
                    <SelectTrigger className="text-black text-left flex items-center justify-between border-gray-200 rounded-md hover:bg-white hover:text-black">
                      <SelectValue placeholder="최소 티어 선택하기" />
                    </SelectTrigger>
                    <SelectContent className="w-full border cursor-pointer border-gray-200 bg-white rounded-md shadow-lg">
                      <SelectItem
                        value="GOLD"
                        className="flex items-center text-black cursor-pointer"
                      >
                        🥇 골드
                      </SelectItem>
                      <SelectItem
                        value="SILVER"
                        className="flex items-center text-black cursor-pointer"
                      >
                        🥈 실버
                      </SelectItem>
                      <SelectItem
                        value="BRONZE"
                        className="flex items-center text-black cursor-pointer"
                      >
                        🥉 브론즈
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="player_limit_count"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <User className="text-gray-500" size={20} />
                  모집 인원
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="!mt-0"
                    placeholder="모집 인원 입력"
                    {...field}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value, 10);
                      field.onChange(Number.isNaN(value) ? undefined : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="full_address"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <MapPin className="text-gray-500" size={20} />
                  경기 장소
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="경기 장소를 입력하세요"
                    {...field}
                    disabled={!!initialData}
                    className="!mt-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recruiting_closed_at"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <CalendarIcon className="text-gray-500" size={20} />
                  모집 마감 날짜
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger disabled={!!initialData} asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left p-3  text-black hover:bg-white hover:text-black"
                      >
                        {field.value
                          ? format(field.value, "yyyy년 MM월 dd일", {
                              locale: ko,
                            })
                          : "모집 마감 날짜 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 bg-white border rounded-md shadow-md">
                      <Calendar
                        mode="single"
                        selected={closedAt ? new Date(closedAt) : undefined}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            handleClosedAtSelect(
                              selectedDate,
                              form.setValue,
                              "recruiting_closed_at",
                            );
                          }
                        }}
                        locale={ko}
                        className="text-black"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="match_generation_type"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 mb-4 items-center ">
                <FormLabel className="flex justify-start items-center gap-2 w-full text-gray-600">
                  <GitCompare className="text-gray-500" size={20} />
                  대진표 타입
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-black text-left flex items-center justify-between border-gray-200 rounded-md hover:bg-white hover:text-black">
                      <SelectValue placeholder="경기 타입 선택하기" />
                    </SelectTrigger>
                    <SelectContent className="w-full border cursor-pointer border-gray-200 bg-white rounded-md shadow-lg">
                      <SelectItem
                        value="FREE"
                        className="flex items-center text-black cursor-pointer"
                      >
                        프리
                      </SelectItem>
                      <SelectItem
                        value="TOURNAMENT"
                        className="flex items-center text-black cursor-pointer"
                      >
                        토너먼트
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center pt-8 gap-4">
          <Button size="lg" className="w-1/4 p-3 font-semibold">
            {initialData ? "경기 수정" : "경기 생성"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LeagueForm;
