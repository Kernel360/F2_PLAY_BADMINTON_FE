"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePatchClubMembersBan } from "@/lib/api/hooks/clubMemberHook";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClubMemberBanDialogProps {
  clubId: string;
  clubMemberId: number;
}

// 유효성 검사용 Zod 스키마
const banSchema = z.object({
  type: z.enum(["THREE_DAYS", "SEVEN_DAYS", "TWO_WEEKS", "PERMANENT"], {
    required_error: "정지 유형을 선택해야 합니다.",
  }),
  banned_reason: z
    .string()
    .min(2, "정지 사유는 최소 2자 이상이어야 합니다.")
    .max(100, "정지 사유는 최대 100자까지 입력할 수 있습니다."),
});

type BanFormValues = z.infer<typeof banSchema>;

function ClubMemberBanDialog({
  clubId,
  clubMemberId,
}: ClubMemberBanDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: patchClubMembersBan } = usePatchClubMembersBan(
    clubId as string,
    clubMemberId,
    () => {
      alert("회원 정지 등록이 완료되었습니다");
      setDialogOpen(false);
    },
  );

  const form = useForm<BanFormValues>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      type: undefined,
      banned_reason: "",
    },
  });

  const onSubmit = (values: BanFormValues) => {
    patchClubMembersBan(values);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-500">
          회원 정지
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">
            회원 정지
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            회원을 정지하려면 사유를 입력하고 정지 유형을 선택해야 합니다.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="banned_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">정지 사유</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="정지 사유를 입력하세요 (최소 2자, 최대 100자)"
                      className="mt-1 w-full rounded-md border resize-none text-black p-2 focus:ring-1 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">정지 유형</FormLabel>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3 mt-2 "
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          id="three-days"
                          value="THREE_DAYS"
                          className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                        />
                        <label
                          htmlFor="three-days"
                          className="text-gray-800 cursor-pointer"
                        >
                          3일 정지
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          id="seven-days"
                          value="SEVEN_DAYS"
                          className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                        />
                        <label
                          htmlFor="seven-days"
                          className="text-gray-800 cursor-pointer"
                        >
                          7일 정지
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          id="two-weeks"
                          value="TWO_WEEKS"
                          className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                        />
                        <label
                          htmlFor="two-weeks"
                          className="text-gray-800 cursor-pointer"
                        >
                          14일 정지
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          id="permanent"
                          value="PERMANENT"
                          className="border-zinc-800 text-zinc-800 checked:bg-zinc-800 checked:text-zinc-800"
                        />
                        <label
                          htmlFor="permanent"
                          className="text-gray-800 cursor-pointer"
                        >
                          영구 정지
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end space-x-2 mt-6 gap-2">
              <DialogClose asChild>
                <Button variant="secondary">취소</Button>
              </DialogClose>
              <Button type="submit" variant="default">
                확인
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ClubMemberBanDialog;
