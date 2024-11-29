"use client";

import Spinner from "@/components/Spinner";
import ClubParticipateButton from "@/components/club/ClubIntro/ClubParticipateButton";
import { Separator } from "@/components/ui/separator";
import { useGetClubsById } from "@/lib/api/hooks/clubHook";
import { useGetClubMembersCheck } from "@/lib/api/hooks/clubMemberHook";
import { getTierWithEmoji } from "@/utils/getTier";
import { format } from "date-fns";
import { useParams } from "next/navigation";

function ClubIntro() {
  const { clubId } = useParams();

  const { data: clubData, isLoading } = useGetClubsById(clubId as string);
  const { data: clubMemberData } = useGetClubMembersCheck(clubId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    );
  }

  if (!clubData) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-black">
        동호회가 존재하지 않습니다
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[400px]">
        <img
          src={clubData.club_image}
          alt="club_banner"
          className="w-full h-[400px] object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* 동호회 이름 */}
        <div className="p-8 pb-0">
          <h1 className="text-3xl font-bold text-gray-900 ">
            {clubData.club_name}
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 bg-white p-8">
            <div className="flex flex-col gap-4">
              {/* 동호회 소개 */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 pb-2">
                    동호회 소개
                  </h2>
                  <Separator />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {clubData.club_description}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[350px] bg-white p-8 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 pb-2 ">
                  동호회 정보
                </h2>
                <Separator />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <p className="font-medium w-24 text-gray-600">개설일</p>
                  <p className="text-gray-800">
                    {clubData?.created_at &&
                      format(new Date(clubData.created_at), "yyyy년 MM월 dd일")}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium w-24 text-gray-600">멤버 수</p>
                  <p className="text-gray-800">
                    {clubData?.club_member_count}명
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex gap-2">
                      {getTierWithEmoji("GOLD")}
                      <p className="text-gray-800">
                        {clubData.gold_club_member_count}명
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {getTierWithEmoji("SILVER")}
                      <p className="text-gray-800">
                        {clubData.silver_club_member_count}명
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {getTierWithEmoji("BRONZE")}
                      <p className="text-gray-800">
                        {clubData.bronze_club_member_count}명
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {clubMemberData && !clubMemberData.data?.is_club_member && (
              <ClubParticipateButton clubId={clubId as string} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubIntro;
