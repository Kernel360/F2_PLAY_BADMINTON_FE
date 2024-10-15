"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import type { components } from "@/schemas/schema";
import { useState } from "react";

type ClubDetailsResponse = components["schemas"]["ClubDetailsResponse"];

interface ClubManagePageProps {
  clubData: ClubDetailsResponse;
}
function ClubManagePage({ clubData }: ClubManagePageProps) {
  const [imagePreview, setImagePreview] = useState(clubData.club_image);
  const [clubName, setClubName] = useState(clubData.club_name);
  const [text, setText] = useState(clubData.club_description);

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
        imagePreview={imagePreview as string}
        onImageChange={handleImageChange}
      />
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-black font-bold text-lg">동호회 이름</p>
          <ClubInfoInputName
            clubName={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 h-full">
          <p className="text-black font-bold text-lg">동호회 소개</p>
          <ClubInfoInputDescription
            description={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button className="place-items-end">변경 저장</Button>
        </div>
      </div>
    </div>
  );
}

export default ClubManagePage;
