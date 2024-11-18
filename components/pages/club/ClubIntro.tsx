"use client";

import { postClubMembers } from "@/lib/api/functions/clubMemberFn";
import { useGetClubsById } from "@/lib/api/hooks/clubHook";
import {
  useGetClubMembersCheck,
  usePostClubMembers,
} from "@/lib/api/hooks/clubMemberHook";
import { format } from "date-fns";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

function ClubIntro() {
  const { clubId } = useParams();

  const { data: clubData, isLoading } = useGetClubsById(clubId as string);
  const { mutate: postClubMembers } = usePostClubMembers(clubId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[464px] w-full">
        Loading...
      </div>
    );
  }

  if (!clubData) {
    return <div>No data available</div>;
  }

  // TODO: applyReason dialog 생성하기
  const handlePostClubMember = () => {
    postClubMembers();
  };

  return (
    <div className="flex space-x-8 w-full h-[464px] items-center">
      <div className="w-[400px] flex flex-col items-center gap-2">
        <img
          src={(clubData?.club_image as string) || "/images/dummy-image.jpg"}
          width={400}
          height={400}
          alt="club_banner"
          className="rounded-md object-cover h-[400px] w-[400px]"
        />
        {!clubData.is_club_member && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            type="button"
            onClick={handlePostClubMember}
          >
            동호회 참여하기
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <p className="text-3xl font-bold text-black">{clubData?.club_name}</p>
        <div className="flex flex-col w-full">
          <p className="border-b-[1px] border-gray-200 font-bold text-black text-lg">
            동호회 소개
          </p>
          <div className="rounded-md mt-2 w-full h-[150px] text-gray-600 overflow-y-scroll">
            {clubData?.club_description}
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
                {clubData?.gold_club_member_count}명
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
                {clubData?.silver_club_member_count}명
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
                {clubData?.bronze_club_member_count}명
              </p>
            </div>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">개설일</p>
            <p>
              {clubData?.created_at !== undefined &&
                format(new Date(clubData?.created_at), "yyyy년 MM월 dd일")}
            </p>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">멤버</p>
            <p>{clubData?.club_member_count}명</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubIntro;
