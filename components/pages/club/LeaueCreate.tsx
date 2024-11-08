"use client";

import LeagueForm from "@/components/club/LeagueForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { usePostLeagues } from "@/lib/api/hooks/leagueHook";
import type { components } from "@/schemas/schema";
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
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LeagueCreateRequest = components["schemas"]["LeagueCreateRequest"];

function LeagueCreate() {
  //   const router = useRouter();
  //   const clubId = Number(usePathname().split("/")[2]);
  //   const [tierLimit, setTierLimit] =
  //     useState<LeagueCreateRequest["tier_limit"]>("GOLD");
  //   const [type, setType] =
  //     useState<LeagueCreateRequest["match_type"]>("SINGLES");
  //   const [date, setDate] = useState<Date>();
  //   const [timeValue, setTimeValue] = useState<string>("00:00");
  //   const [closedAt, setClosedAt] = useState<string>("");
  //   const { mutate: createLeague } = usePostLeagues(clubId);
  //   const { register, handleSubmit, setValue, setError } =
  //     useForm<LeagueCreateRequest>({
  //       mode: "onBlur",
  //     });

  //   const toLocalISOString = (date: Date): string => {
  //     const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
  //     return `${formattedDate}.000`; // 밀리초 부분을 '000'으로 고정
  //   };

  //   const handleLeagueTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const time = e.target.value;
  //     if (!date) {
  //       setTimeValue(time);
  //       return;
  //     }
  //     const [hours, minutes] = time.split(":").map(Number);
  //     if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
  //       const newDate = setHours(setMinutes(date, minutes ?? 0), hours ?? 0);
  //       setDate(newDate);
  //       setValue("league_at", toLocalISOString(newDate), {
  //         shouldValidate: true,
  //       });
  //       // setValue("league_at", newDate.toISOString(), { shouldValidate: true });
  //       setTimeValue(time);
  //     }
  //   };

  //   const handleLeagueDaySelect = (selectedDate: Date) => {
  //     const [hours, minutes] = timeValue.split(":").map(Number);
  //     if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
  //       const newDate = setHours(
  //         setMinutes(selectedDate, minutes ?? 0),
  //         hours ?? 0,
  //       );
  //       setDate(newDate);
  //       setValue("league_at", toLocalISOString(newDate), {
  //         shouldValidate: true,
  //       });
  //       // setValue("league_at", newDate.toISOString(), { shouldValidate: true });
  //     }
  //   };

  //   const handleClosedAtSelect = (selectedDate: Date) => {
  //     const closingDate = endOfDay(selectedDate);
  //     setClosedAt(formatISO(closingDate));
  //     setValue("closed_at", toLocalISOString(closingDate), {
  //       shouldValidate: true,
  //     });
  //     // setValue("closed_at", closingDate.toISOString(), { shouldValidate: true });
  //   };

  //   const selectedTier = () => {
  //     setValue("tier_limit", tierLimit, { shouldValidate: true });
  //     if (tierLimit === "GOLD") {
  //       return "🥇 골드";
  //     }
  //     if (tierLimit === "SILVER") {
  //       return "🥈 실버";
  //     }
  //     return "🥉 브론즈";
  //   };

  //   const selectedType = () => {
  //     setValue("match_type", type, { shouldValidate: true });
  //     if (type === "SINGLES") {
  //       return "단식";
  //     }
  //     return "복식";
  //   };

  //   const handleCreateSchedule = (data: LeagueCreateRequest) => {
  //     const newScheduleData: LeagueCreateRequest = {
  //       league_name: data.league_name,
  //       description: data.description,
  //       league_location: data.league_location,
  //       tier_limit: data.tier_limit,
  //       match_type: data.match_type,
  //       league_at: data.league_at,
  //       closed_at: data.closed_at,
  //       player_count: data.player_count,
  //       // 해당 data는 초기 기획 상 RANDOM임
  //       match_generation_type: "RANDOM",
  //     };
  //     createLeague(newScheduleData, {
  //       onSuccess: () => {
  //         router.push(`/club/${clubId}/schedule`);
  //       },
  //     });
  //   };

  const { clubId, leagueId } = useParams();
  return (
    <div className="container mx-auto rounded-lg space-y-6 ">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">경기 생성</h2>
      </div>

      <LeagueForm clubId={clubId as string} leagueId={leagueId as string} />
    </div>
  );
}

export default LeagueCreate;
