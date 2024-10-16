import type { components } from "@/schemas/schema";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React from "react";

type ClubDetailsResponse = components["schemas"]["ClubDetailsResponse"];

interface ClubIntroPageProps {
  clubData: ClubDetailsResponse;
}

function ClubIntroPage({ clubData }: ClubIntroPageProps) {
  if (!clubData) {
    return <div>No data available</div>;
  }

  const createdDate = new Date(clubData.created_at as string);
  const formattedDate = format(createdDate, "yyyy년 MMMM d일", { locale: ko });

  return (
    <div className="flex space-x-8 w-full h-[464px] items-center">
      <div className="w-[400px] flex flex-col items-center gap-2">
        {/* TODO: 동호회 참여하기 버튼, 유저가 입력하지 않지만 보여줄 데이터 추가(가입 인원, 티어별 인원, 개설일 등)*/}
        <Image
          src={clubData.club_image as string}
          width={100}
          height={100}
          alt="club image"
          className="rounded-md object-cover h-[400px] w-[400px]"
        />
      </div>
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <p className="text-3xl font-bold text-black">{clubData.club_name}</p>
        <div className="flex flex-col w-full">
          <p className="border-b-[1px] border-gray-200 font-bold text-black text-lg">
            동호회 소개
          </p>
          <div className="rounded-md mt-2 w-full h-[150px] outline-none text-gray-600 overflow-y-scroll resize-none">
            {clubData.club_description}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="border-b-[1px] border-gray-200 text-black text-lg font-bold">
            동호회 정보
          </p>
          <div className="flex mt-2 gap-4">
            <div className="flex items-center">
              <Image
                src="/images/tier-gold.png"
                alt="tier-gold"
                width={20}
                height={20}
              />
              <p className="pl-1 text-black">
                {clubData.club_member_count_by_tier?.gold_club_member_count}명
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/tier-silver.png"
                alt="tier-silver"
                width={20}
                height={20}
              />
              <p className="pl-1 text-black">
                {clubData.club_member_count_by_tier?.silver_club_member_count}명
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/tier-bronze.png"
                alt="tier-bronze"
                width={20}
                height={20}
              />
              <p className="pl-1 text-black">
                {clubData.club_member_count_by_tier?.bronze_club_member_count}명
              </p>
            </div>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">개설일</p>
            <p>{formattedDate}</p>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">멤버</p>
            <p>{clubData.club_member_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubIntroPage;
