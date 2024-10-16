"use client";

import ClubInfoInputDescription from "@/components/common/clubInfoInput/ClubInfoInputDescription";
import ClubInfoInputImage from "@/components/common/clubInfoInput/ClubInfoInputImage";
import ClubInfoInputName from "@/components/common/clubInfoInput/ClubInfoInputName";
import { Button } from "@/components/ui/Button";
import { usePatchClubs, usePostClubsImg } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ClubDetailsResponse = components["schemas"]["ClubDetailsResponse"];
type ClubUpdate = components["schemas"]["ClubUpdateRequest"];

interface ClubManagePageProps {
  clubData: ClubDetailsResponse;
}

function ClubManagePage({ clubData }: ClubManagePageProps) {
  const [imgUrl, setImgUrl] = useState<string>(clubData.club_image as string);
  const { mutate: patchClub } = usePatchClubs(clubData.club_id ?? 0);
  const { mutate: patchClubImg } = usePostClubsImg();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ClubUpdate>({
    defaultValues: {
      club_name: clubData.club_name,
      club_description: clubData.club_description,
      club_image: imgUrl,
    },
    mode: "onBlur",
  });

  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    patchClubImg(formData, {
      onSuccess: (data) => {
        setImgUrl(data);
        setValue("club_image", data);
        clearErrors("club_image");
      },
      onError: () => {
        setError("club_image", {
          type: "manual",
          message: "이미지 업로드에 실패했습니다",
        });
      },
    });
  };

  const handleUpdateclub = (data: ClubUpdate) => {
    const newData: ClubUpdate = {
      club_name: data.club_name,
      club_description: data.club_description,
      club_image: data.club_image,
    };

    patchClub(newData, {
      onSuccess: () => {
        alert("변경이 완료되었습니다!");
      },
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateclub)}
      method="patch"
      className="flex space-x-8 w-full h-[464px] items-center"
    >
      <div className="flex flex-col gap-1 justify-center">
        {/* 파일 선택 필드를 register로 관리 */}
        <input
          type="text"
          className="hidden"
          {...register("club_image", {
            required: "이미지를 선택해주세요",
          })}
        />
        <ClubInfoInputImage
          imagePreview={imgUrl}
          onImageChange={(e) => handleImageChange(e)}
        />
        {errors.club_image && (
          <p className="text-red-500">{errors.club_image.message}</p>
        )}
      </div>
      <div className="flex flex-col flex-1 h-[400px] gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-black font-bold text-lg">동호회 이름</p>
          <ClubInfoInputName
            {...register("club_name", {
              required: "동호회 이름을 입력하세요",
            })}
          />
          {errors.club_name && (
            <p className="text-red-500">{errors.club_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 h-full">
          <p className="text-black font-bold text-lg">동호회 소개</p>
          <ClubInfoInputDescription
            {...register("club_description", {
              required: "동호회 설명을 입력하세요",
            })}
          />
          {errors.club_description && (
            <p className="text-red-500">{errors.club_description.message}</p>
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button className="place-items-end">변경 저장</Button>
        </div>
      </div>
    </form>
  );
}

export default ClubManagePage;
