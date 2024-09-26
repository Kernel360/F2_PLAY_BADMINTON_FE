import React from 'react';
import dummy from '@/app/images/dummy-image.jpg';
import Image from 'next/image';

function ClubIntroPages() {
  return (
    <div className="flex space-x-8 w-full">
      <div className="w-2/5 flex flex-col items-center gap-2">
        <Image
          src={dummy.src}
          width={100}
          height={100}
          alt="club image"
          className="w-full rounded-md"
        />
        <p className="font-bold text-lg line-clamp-2">동호회 이름</p>
      </div>
      <textarea
        readOnly
        className="rounded-md flex-1 h-96 outline-none text-black overflow:scroll"
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
        안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
        입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
        동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
        안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
        입니다. 안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
        동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.
        안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회
        입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요
        동호회 입니다. 안녕하세요 동호회 입니다.
      </textarea>
    </div>
  );
}

export default ClubIntroPages;
