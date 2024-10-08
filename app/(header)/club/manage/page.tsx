"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

function ClubManagePage() {
  const [imagePreview, setImagePreview] = useState("/images/dummy-image.jpg");
  const [clubName, setClubName] = useState("기존 동호회 이름");
  const [text, setText] = useState(
    "안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요동호회 입니다. 안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회입니다.안녕하세요 동호회 입니다. 안녕하세요 동호회 입니다.",
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO(iamgyu): 서버로 이미지 업로드 로직 추가
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="flex space-x-8 w-full h-[464px] items-center">
      <ClubInfoInputImage
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
      />
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <ClubInfoInputName
          clubName={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <ClubInfoInputDescription
          description={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <Button className="place-items-end">변경 저장</Button>
        </div>
      </div>
    </div>
  );
}

export default ClubManagePage;
