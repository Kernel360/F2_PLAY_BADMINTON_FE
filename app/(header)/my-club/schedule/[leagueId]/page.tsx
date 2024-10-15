"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { format } from "date-fns";
import {
  Award,
  BookUser,
  Calendar,
  CalendarDays,
  Edit,
  Flag,
  MapPin,
  Pencil,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
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

const sampleLeague: League = {
  leagueName: "11월 배드민턴 정기 모임",
  description:
    "이번 11월 배드민턴 정기 모임은 초급자와 중급자들이 함께 모여 배드민턴 실력을 향상시키고, 건강한 생활을 추구하며 즐거운 시간을 보내기 위한 모임입니다. 이 모임은 배드민턴을 통해 체력 향상뿐만 아니라 새로운 친구를 사귀고, 배드민턴에 대한 이해도를 높이는 것을 목표로 하고 있습니다. 참가자들은 실력에 상관없이 모두 환영하며, 특히 초급자와 중급자들이 함께 어울려 배울 수 있도록 다양한 수준의 경기 방식을 채택하고 있습니다. 경기 방식은 싱글 매치와 더블 매치로 나누어져 있으며, 각 참가자는 자신의 실력에 맞게 경기에 참가할 수 있습니다. 배드민턴을 처음 접하는 분들을 위해 기초적인 기술을 배우는 시간도 마련되어 있으며, 경력이 있는 중급자 분들은 이러한 기초 기술을 함께 연습하며 서로의 실력을 향상시킬 수 있는 기회를 얻게 됩니다. 이번 모임에서는 전문 코치의 지도 아래, 기본적인 배드민턴 기술부터 고급 기술에 이르기까지 다양한 기술을 배우고 연습할 수 있는 기회가 주어집니다. 게임 방식에 따라 싱글 혹은 더블 경기를 선택할 수 있으며, 각 경기 후에는 상대방과의 피드백 시간을 통해 개선할 부분을 함께 논의하게 됩니다. 이를 통해 서로의 실력을 향상시키고, 한 단계 더 발전할 수 있는 계기를 제공합니다.이 모임에서는 경기 후 소규모 토론 시간을 가지며, 경기에서 배운 점이나 부족했던 점을 공유하게 됩니다. 또한, 참가자들이 경기 중 겪었던 재미있는 경험이나 배운 점을 공유하며 더 즐거운 시간을 보낼 수 있도록 다양한 활동도 마련되어 있습니다. 이번 모임은 스포츠를 통해 신체 활동을 촉진할 뿐만 아니라, 배드민턴을 통해 지역사회 내에서 스포츠 문화를 활성화하고, 참가자 간의 유대감을 형성하는 데 중점을 두고 있습니다.참가자들은 모임 전날까지 준비물을 챙겨주시고, 기본적인 안전 수칙을 준수해 주시기 바랍니다. 경기 도중 발생할 수 있는 부상 예방을 위해 충분히 스트레칭을 해주시고, 무리하지 않도록 주의해 주세요. 또한, 경기 중에는 상대방에 대한 예의와 존중을 지켜주셔야 하며, 특히 초급자들에게는 격려와 지지를 부탁드립니다.이번 배드민턴 모임을 통해 여러분들이 배드민턴의 즐거움을 느끼고, 운동을 통해 건강을 증진시키며, 새로운 사람들과 유대감을 쌓을 수 있는 기회가 되길 바랍니다. 많은 분들이 함께 참여하셔서 더욱 풍성한 모임이 될 수 있도록 여러분의 적극적인 참여와 관심 부탁드립니다.",
  tierLimit: "GOLD",
  status: "OPEN",
  matchType: "SINGLE",
  leagueAt: "2024-09-30T05:53:45.509Z",
  closedAt: "2024-10-30T05:53:45.509Z",
  playerCount: 20,
  currentApplicants: 10,
  location: "서울 체육관",
  createdAt: "2024-09-30T05:53:45.509Z",
  modifiedAt: "2024-09-30T05:53:45.509Z",
  matchingRequirement: "TIER",
};

function LeaguePage() {
  const league = sampleLeague;
  const [isParticipant, setIsParticipant] = useState(false);

  const handleParticipationToggle = () => {
    setIsParticipant(!isParticipant);
  };

  const getRecruitmentStatusLabel = (status: string) => {
    switch (status) {
      case "OPEN":
        return "모집 중";
      case "CLOSED":
        return "모집 완료";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto bg-white rounded-lg space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {league.leagueName}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <CalendarDays size={16} />
            <Text size="sm">
              {format(new Date(league.createdAt), "yyyy년 MM월 dd일")}
            </Text>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-primary"
          >
            <Pencil size={16} />
            수정
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex items-center gap-1"
          >
            <Trash2 size={16} />
            삭제
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Calendar className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">경기 일자</p>
            <p className="text-sm font-semibold text-gray-800">
              {format(new Date(league.leagueAt), "yyyy-MM-dd HH시 mm분")}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Flag className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 상태</p>
            <p className="text-sm font-semibold text-gray-800">
              {getRecruitmentStatusLabel(league.status)}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <MapPin className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">경기 장소</p>
            <p className="text-sm font-semibold text-gray-800">
              {league.location}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <User className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 인원</p>
            <p className="text-sm font-semibold text-gray-800">
              {league.currentApplicants}/{league.playerCount} 명
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Calendar className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">모집 마감 일자</p>
            <p className="text-sm font-semibold text-gray-800">
              {format(new Date(league.closedAt), "yyyy-MM-dd HH시 mm분")}
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
          <Award className="text-gray-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">지원 티어</p>
            <p className="text-sm font-semibold text-gray-800">
              {getTierWithEmoji(league.tierLimit)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Edit className="text-gray-500" size={20} />
          경기 소개
        </h3>
        <div className="mt-5">
          <Text color="black">{league.description}</Text>
        </div>
      </div>
      <div className="flex justify-center items-center pt-8 gap-4">
        <Link className="w-1/4" href={"/my-club/schedule/1/match"}>
          <Button
            size="lg"
            variant="outline"
            className="items-center justify-center gap-2 border-primary w-full"
          >
            <BookUser size={20} />
            대진표 보기
          </Button>
        </Link>
        <Button
          size="lg"
          variant={isParticipant ? "destructive" : "default"}
          className="items-center justify-center gap-2 border-primary w-1/4"
          onClick={handleParticipationToggle}
        >
          <User size={20} />
          {isParticipant ? "참가 취소" : "참가하기"}
        </Button>
      </div>
    </div>
  );
}

export default LeaguePage;
