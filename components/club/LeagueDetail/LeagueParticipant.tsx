import type { LeagueParticipantType } from "@/types/leagueTypes";
import Image from "next/image";

interface LeagueParticipant {
  participant: LeagueParticipantType;
}

export default function LeagueParticipant({ participant }: LeagueParticipant) {
  const { name, profile_image } = participant;

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-200">
      {/* 프로필 사진 */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden ">
        <Image
          src={profile_image}
          alt={`${name}'s profile`}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
        />
      </div>

      {/* 사용자 이름 */}
      <h4 className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
        {name}
      </h4>
    </div>
  );
}
