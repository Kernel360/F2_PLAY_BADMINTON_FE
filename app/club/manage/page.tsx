'use client';

import Image from 'next/image';
import React, { useState } from 'react';

function ClubManagePage() {
  const [imagePreview, setImagePreview] = useState('/images/dummy-image.jpg');

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex space-x-8 w-full">
        <div className="w-2/5 flex flex-col items-center gap-2 bg-yellow-500 rounded-md">
          <label htmlFor="file">사진 첨부</label>
          <Image
            priority
            src={imagePreview}
            layout="responsive"
            width="100"
            height="100"
            alt="preview"
          />
          <p>동호회 이름</p>
        </div>
        <textarea
          placeholder="소개글 작성"
          className="rounded-md flex-1 h-96 outline-none text-black overflow:scroll placeholder-gray-400"
        />
      </div>
      <button className="px-8 py-3 bg-red-500 rounded-md font-bold">
        수정
      </button>
    </div>
  );
}

export default ClubManagePage;
