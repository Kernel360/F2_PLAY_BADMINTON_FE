import dummy from "@/public/images/dummy-image.jpg";
import Image from "next/image";
import React from "react";

function ClubIntroPage() {
  return (
    <div className="flex space-x-8 w-full">
      <div className="w-[450px] flex flex-col items-center gap-2">
        <Image
          src={dummy.src}
          width={100}
          height={100}
          alt="club image"
          className="w-full rounded-md object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-3xl font-bold text-black">동호회 이름</p>
        <textarea
          readOnly
          className="mt-4 rounded-md w-full h-96 outline-none text-gray-700 overflow:scroll resize-none"
        >
          안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회
          입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요
          동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
          입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
          동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
          안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
          입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
          동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
          안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
          입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
          동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
          안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
          입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
          동호회 입니다. 안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.
        </textarea>
      </div>
    </div>
  );
}

export default ClubIntroPage;
