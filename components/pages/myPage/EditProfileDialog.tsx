import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  usePostMembersProfileImage,
  usePutMembersProfile,
} from "@/lib/api/hooks/memberHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Edit } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "닉네임은 2자 이상 10자 이내로 입력하세요.")
    .max(10, "닉네임은 2자 이상 10자 이내로 입력하세요."),
  profileImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        file && ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "이미지는 jpg, jpeg, png, gif 형식만 가능합니다.",
    ),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  initialName: string;
  initialProfileImage: string;
}

function EditProfileDialog({
  initialName,
  initialProfileImage,
}: EditProfileDialogProps) {
  const { mutate: postProfileImage } = usePostMembersProfileImage();
  const { mutate: putProfile } = usePutMembersProfile();
  const [profileImage, setProfileImage] = useState<string>(initialProfileImage);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialName,
    },
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadedImageFile(file);
      form.setValue("profileImage", file);
    }
  };

  const handleImageRemove = () => {
    setProfileImage("/images/dummy-image.jpg");
    setUploadedImageFile(null);
    form.setValue("profileImage", undefined);
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    const { name } = data;
    if (uploadedImageFile) {
      const formData = new FormData();
      formData.append("multipartFile", uploadedImageFile);
      postProfileImage(formData, {
        onSuccess: (response) => {
          if (response.data) {
            putProfile(
              {
                name,
                profile_image_url: response.data,
              },
              {
                onSuccess: () => {
                  setOpen(false);
                  setUploadedImageFile(null);
                },
              },
            );
          }
        },
        onError: (error) => {
          console.error("이미지 업로드 실패:", error);
        },
      });
    } else {
      putProfile(
        {
          name,
          profile_image_url: profileImage,
        },
        {
          onSuccess: () => setOpen(false),
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-5 w-full text-black hover:bg-white hover:text-black"
        >
          <Edit className="mr-1 h-4 w-4 text-blue-600" />
          프로필 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogTitle className="text-center text-black">
          프로필 수정
        </DialogTitle>
        <DialogDescription className="text-center mt-2">
          닉네임과 프로필 이미지를 수정할 수 있습니다.
        </DialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-4 mt-6"
          >
            <FormField
              name="profileImage"
              control={form.control}
              render={() => (
                <FormItem className="w-full flex flex-col gap-2 justify-center items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 rounded-full">
                      <AvatarImage src={profileImage} alt="프로필 미리보기" />
                      <AvatarFallback />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer">
                      <label htmlFor="file-input" className="cursor-pointer">
                        <Camera className="text-white h-5 w-5" />
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  {profileImage !== "/images/dummy-image.jpg" && (
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="text-sm text-gray-500 mt-2"
                    >
                      이미지 삭제
                    </button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2 justify-center items-start">
                  <Label htmlFor="name" className="text-gray-700">
                    닉네임
                  </Label>
                  <FormControl className="w-full">
                    <input
                      id="name"
                      {...field}
                      placeholder="닉네임을 입력하세요"
                      // value={initialName}
                      className="mt-1 h-10 rounded-sm text-black border border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 w-full">
              <Button type="submit" variant="default" className="w-full">
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
