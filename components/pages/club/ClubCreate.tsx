"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const clubCreateSchema = z.object({
  club_name: z
    .string()
    .min(2, "2자 이상 입력해주세요")
    .max(20, "20자 이하로 입력해주세요"),
  club_description: z
    .string()
    .min(2, "2자 이상 입력해주세요")
    .max(1000, "공백 포함 1000자 이하로 입력해주세요"),
  club_image: z.string().min(1, "이미지를 업로드하세요"),
});

type ClubCreate = z.infer<typeof clubCreateSchema>;

function ClubCreate() {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const { mutate: createClubImg } = usePostClubsImg();
  const { mutate: createClub } = usePostClubs((clubId) => {
    router.push(`/club/${clubId}`);
  });

  const form = useForm<ClubCreate>({
    resolver: zodResolver(clubCreateSchema),
    defaultValues: { club_name: "", club_description: "", club_image: "" },
    mode: "onBlur",
  });

  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("multipartFile", file);

    createClubImg(formData, {
      onSuccess: (data) => {
        if (data.data) {
          setImgUrl(data.data || undefined);
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
      setImgUrl(undefined);
      form.setError("club_image", {
        type: "manual",
        message: "이미지를 다시 업로드하세요",
      });
    }
  };

  const handleCreateClub = (data: ClubCreate) => {
    if (!imgUrl) {
      form.setError("club_image", {
        type: "manual",
        message: "이미지를 업로드하세요",
      });
      return;
    }

    const newClubData: ClubCreate = {
      club_name: data.club_name,
      club_description: data.club_description,
      club_image: imgUrl,
    };

    createClub(newClubData);
  };

  return (
    <div className="w-full my-10">
      <h1 className="text-xl font-bold text-black ">동호회 생성하기</h1>

      <Form {...form}>
        <div className="max-w-5xl mx-auto space-y-8 mt-4">
          {/* 이미지 섹션 */}
          <div className="relative w-full h-[448px] bg-gray-100 overflow-hidden flex justify-center items-center">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Camera className="h-10 w-10 mb-2" />
                <p className="text-sm">이미지를 업로드하세요</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={onImageSelect}
            />
          </div>
          {form.formState.errors.club_image && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.club_image.message}
            </p>
          )}

          {/* 입력 필드 */}
          <form
            onSubmit={form.handleSubmit(handleCreateClub)}
            method="post"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="club_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-bold">
                    동호회 이름
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full text-black border-b border-gray-300 focus:outline-none focus:border-black p-2"
                      placeholder="동호회 이름을 입력하세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="club_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-bold">
                    동호회 설명
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full text-black resize-none h-44 border-b border-gray-300 focus:outline-none focus:border-black p-2"
                      rows={4}
                      placeholder="동호회의 목적, 활동 내용 등을 입력하세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button size="lg" type="submit">
                생성
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default ClubCreate;
