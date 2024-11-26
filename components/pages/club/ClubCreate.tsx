"use client";

import ClubInfoInputDescription from "@/components/club/ClubInputDescription";
import ClubInfoInputImage from "@/components/club/ClubInputImage";
import ClubInfoInputName from "@/components/club/ClubInputName";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePostClubs, usePostClubsImg } from "@/lib/api/hooks/clubHook";
import type { components } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod 스키마 정의
const clubCreateSchema = z.object({
  club_name: z
    .string()
    .min(2, "2자 이상 입력해주세요")
    .max(20, "20자 이하로 입력해주세요"),
  club_description: z
    .string()
    .min(2, "2자 이상 입력해주세요")
    .max(1000, "공백 포함 1000자 이하로 입력해주세요"),
  club_image: z.string(),
});

type ClubCreate = z.infer<typeof clubCreateSchema>;

function ClubCreate() {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState<string>("/images/dummy-image.jpg");
  const { mutate: createClubImg } = usePostClubsImg();
  const { mutate: createClub } = usePostClubs((clubId) => {
    router.push(`/club/${clubId}`);
  });

  const form = useForm<ClubCreate>({
    resolver: zodResolver(clubCreateSchema), // Zod 스키마 연결
    defaultValues: { club_name: "", club_description: "", club_image: "" },
    mode: "onBlur",
  });

  const isValidImageFile = (fileName: string) => {
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    return fileExtension && allowedExtensions.includes(fileExtension);
  };

  const uploadImage = (file: File) => {
    if (!isValidImageFile(file.name)) {
      form.setError("club_image", {
        type: "manual",
        message:
          "png, jpg, jpeg, gif 중 하나의 확장자를 가진 파일을 업로드하세요",
      });
      return;
    }

    const formData = new FormData();
    formData.append("multipartFile", file);

    createClubImg(formData, {
      onSuccess: (data) => {
        if (data.data) {
          setImgUrl(data.data || "/images/dummy-image.jpg");
          form.setValue("club_image", data.data);
          form.clearErrors("club_image");
        }
      },
      onError: () => {
        form.setError("club_image", {
          type: "manual",
          message: "이미지 업로드에 실패했습니다",
        });
      },
    });
  };

  const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    } else {
      setImgUrl("/images/dummy-image.jpg");
    }
  };

  const handleCreateClub = (data: ClubCreate) => {
    const newClubData: ClubCreate = {
      club_name: data.club_name,
      club_description: data.club_description,
      club_image: imgUrl,
    };

    createClub(newClubData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateClub)}
        method="post"
        className="px-14 pt-8 w-full"
      >
        <div className="flex space-x-8 w-full h-[464px] items-center">
          <div className="flex flex-col gap-1 justify-center">
            <FormField
              control={form.control}
              name="club_image"
              render={({ field }) => (
                <FormItem>
                  <input type="text" className="hidden" {...field} />
                  <ClubInfoInputImage
                    imagePreview={imgUrl || "/images/dummy-image.jpg"}
                    onImageChange={(e) => onImageSelect(e)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col flex-1 h-[400px] gap-4">
            <FormField
              control={form.control}
              name="club_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>동호회 이름</FormLabel>
                  <FormControl>
                    <ClubInfoInputName {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="club_description"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>동호회 소개</FormLabel>
                  <FormControl>
                    <ClubInfoInputDescription {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-5">
          <Button size="lg" type="submit">
            완료
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ClubCreate;
