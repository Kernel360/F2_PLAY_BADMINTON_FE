'use client';

import React, { useRef, useState } from 'react';

function CreateClubPage() {
  const [imagePreview, setImagePreview] = useState('/images/dummy-image.jpg');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="px-14 pt-8 w-full">
      <div className="flex flex-col gap-4">
        <p className="text-gray-400">동호회 이름</p>
        <input
          type="text"
          className="w-full text-gray-400 text-2xl bg-transparent outline-none border-gray-300 border-b-[1px] focus:border-gray-800"
        />
      </div>
      <div className=" w-full pt-8 flex flex-col gap-4 text-gray-400">
        <p>동호회 사진</p>
        <div className="flex flex-row justify-center space-x-8">
          <div className="h-[300px] w-[450px]">
            <img
              alt="previewImg"
              src={imagePreview}
              className="object-cover border-2 border-gray-400 rounded-md w-full h-full"
            />
          </div>
          <form className="flex flex-1 justify-center items-center border-2 border-gray-400 rounded-md">
            <button
              type="button"
              onClick={handleImageClick}
              className="focus:outline-none"
            >
              <p>이미지 선택</p>
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-col pt-8 gap-4">
        <p className="text-gray-400">동호회 소개</p>
        <textarea
          placeholder="동호회 소개"
          className="w-full rounded-md border-2 border-gray-400"
        />
      </div>
      <div className="flex justify-center items-center pt-8 gap-4">
        <button
          type="button"
          className="px-12 py-3 bg-primary text-white rounded-md"
        >
          취소
        </button>
        <button
          type="button"
          className="px-12 py-3 bg-primary text-white rounded-md"
        >
          완료
        </button>
      </div>
      <div className="m-12" />
    </div>
  );
}

export default CreateClubPage;
