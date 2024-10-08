import dummy from "@/public/images/dummy-image.jpg";
import Image from "next/image";
import React from "react";

function ClubIntroPage() {
  return (
    <div className="flex space-x-8 w-full h-[464px] items-center">
      <div className="w-[400px] flex flex-col items-center gap-2">
        {/* TODO: 동호회 참여하기 버튼, 유저가 입력하지 않지만 보여줄 데이터 추가(가입 인원, 티어별 인원, 개설일 등)*/}
        <Image
          src={dummy.src}
          width={100}
          height={100}
          alt="club image"
          className="w-full rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <p className="text-3xl font-bold text-black">동호회 이름</p>
        <div className="flex flex-col w-full">
          <p className="border-b-[1px] border-gray-200 font-bold text-black text-lg">
            동호회 소개
          </p>
          <textarea
            readOnly
            className="rounded-md mt-2 w-full outline-none text-gray-600 overflow:scroll resize-none"
          >
            안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회
            입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
            안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
            입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
            동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
            안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
            입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.
          </textarea>
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
              <p className="pl-1 text-black">8명</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/tier-silver.png"
                alt="tier-silver"
                width={20}
                height={20}
              />
              <p className="pl-1 text-black">12명</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/tier-bronze.png"
                alt="tier-bronze"
                width={20}
                height={20}
              />
              <p className="pl-1 text-black">8명</p>
            </div>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">개설일</p>
            <p>2024년 10월</p>
          </div>
          <div className="flex text-black mt-3 gap-4">
            <p className="font-bold">멤버</p>
            <p>28</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubIntroPage;
