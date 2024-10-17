"use client";

import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import {
  useGetMembersMyPage,
  usePostMembersProfileImage,
} from "@/lib/api/hooks/memberHook";
import { getTierWithEmoji } from "@/utils/getTierWithEmoji";
import { ImagePlus } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MyOneGameResult from "./MyOneGameResult";

const matches = [
  {
    id: 1,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 2,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 3,
    opponentName: "a",
    result: "LOSE",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 4,
    opponentName: "a",
    result: "LOSE",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 5,
    opponentName: "a",
    result: "LOSE",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 6,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 7,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 8,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 9,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 10,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
  {
    id: 11,
    opponentName: "a",
    result: "WIN",
    matchType: "SINGLE",
    matchDate: "2024-09-15",
  },
];

function My() {
  const { data, isLoading, error } = useGetMembersMyPage();
  const [infoUpdate, setInfoUpdate] = useState(false);
  const [userImg, setUserImg] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const { mutate: postImageToS3 } = usePostMembersProfileImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { profileImg: "" },
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      setValue("profileImg", data?.profile_image || "");
      setUserImg(data.profile_image || "");
    }
  }, [data, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    postImageToS3(formData, {
      onSuccess: (data) => {
        alert("이미지가 S3에 저장되었습니다");
        setValue("profileImg", file.name); // 성공 시 값 업데이트
        clearErrors("profileImg"); // 에러 클리어
      },
      onError: () => {
        setError("profileImg", { message: "이미지 업로드에 실패했습니다." });
      },
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpdate = () => {
    setInfoUpdate(!infoUpdate);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const ImageUpdate = () => {
    if (infoUpdate) {
      return (
        <div className="relative w-64 h-64 rounded-full">
          <input
            type="text"
            className="hidden"
            {...register("profileImg", {
              required: "이미지를 선택해주세요",
            })}
          />
          <img
            alt="previewImg"
            src={userImg || "/images/dummy-image.jpg"}
            className="object-cover w-full h-full rounded-full"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="absolute bottom-2 right-2">
            <IconButton radius="round" size="lg" onClick={handleImageClick}>
              <ImagePlus width={"80%"} height={"80%"} />
            </IconButton>
          </div>
        </div>
      );
    }

    return (
      <img
        src={userImg || "/images/dummy-image.jpg"}
        alt="userImg"
        className="object-cover w-64 h-64 rounded-full"
      />
    );
  };

  return (
    <div className="mt-4 px-16">
      <div className="flex justify-between">
        <div className="flex items-center gap-12">
          <ImageUpdate />
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center gap-4">
              <p className="text-black font-bold text-lg">{data?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-black font-bold text-lg">소속</p>
              <p className="text-black text-lg">
                {data?.club_member_my_page_response?.club_name || "없음"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-black font-bold text-lg">티어</p>
              <div className="flex items-center gap-1">
                <p className="text-black text-lg">
                  {getTierWithEmoji(
                    data?.club_member_my_page_response?.tier || "",
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-black font-bold text-lg">전적</p>
              <p className="text-black">
                {data?.league_record_info?.match_count}전 |{" "}
                {data?.league_record_info?.win_count}승 |{" "}
                {data?.league_record_info?.draw_count}무 |{" "}
                {data?.league_record_info?.lose_count}패
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {infoUpdate ? (
            <Button onClick={handleImageUpdate}>수정 완료</Button>
          ) : (
            <Button onClick={() => setInfoUpdate(!infoUpdate)}>
              정보 수정
            </Button>
          )}
          <Button
            variant="outline"
            className="border-red-500 hover:bg-red-500 text-red-500"
          >
            동호회 탈퇴
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full mt-8">
        <p className="text-black font-bold text-xl">경기 결과</p>
        <div className="flex flex-col mt-4">
          <div className="flex font-bold text-gray-600 bg-gray-100 p-2 rounded-md">
            <div className="flex-[2]">대결 상대</div>
            <div className="flex-[1]">경기 방식</div>
            <div className="flex-[1]">경기 결과</div>
            <div className="flex-[1]">경기 날짜</div>
          </div>
          <div className="flex flex-col">
            {matches.slice(0, visibleCount).map((match) => (
              <MyOneGameResult key={match.id} match={match} />
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-2 items-center">
          {visibleCount < matches.length && (
            <Button
              onClick={handleShowMore}
              className="align-center font-bold w-1/5 hover:bg-white hover:text-primary"
              variant="ghost"
            >
              더보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default My;
