import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { usePatchLeague } from "@/lib/api/hooks/leagueHook";
import { useState } from "react";

interface RecruitmentInfoDialog {
  clubId: string;
  leagueId: string;
}

const RecruitmentInfoDialog = ({ clubId, leagueId }: RecruitmentInfoDialog) => {
  const [open, setOpen] = useState(false);

  const patchLeagueOnSuccess = () => setOpen(false);

  const { mutate: patchLeague } = usePatchLeague(
    clubId,
    leagueId,
    patchLeagueOnSuccess,
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="default">
            모집 마감
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-lg p-5 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-black text-lg font-semibold text-center">
              모집 마감 전에 꼭 확인하세요!
            </DialogTitle>
          </DialogHeader>
          <Separator className="mb-4" />

          {/* 안내 내용 */}
          <ul className="space-y-4">
            <li className="text-black text-sm">
              - 모집 마감 버튼을 누르면 <strong>되돌릴 수 없어요</strong>
            </li>
            <li className="text-black text-sm">
              - <strong>적절한 인원이 충족되지 않으면</strong>, 모집을 마감할 수
              없어요
            </li>
            <li className="text-black text-sm">
              - 모집 마감 시간 전까지 <strong>인원이 부족하면</strong>, 경기가
              자동으로 취소돼요
            </li>
            <li className="text-black text-sm">
              - <strong>경기 규칙에 맞는 인원이 필요해요!</strong> 아래 조건을
              꼭 확인해 주세요
            </li>
          </ul>
          <Separator className="my-4" />

          <div className="text-black text-sm text-left space-y-3">
            <p className="font-bold text-black">⚡ 적절한 인원 기준</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>프리 단식</strong>: 최소 2명, 짝수
              </li>
              <li>
                <strong>프리 복식</strong>: 최소 4명, 4의 배수
              </li>
              <li>
                <strong>토너먼트 단식</strong>: 최소 2명
              </li>
              <li>
                <strong>토너먼트 복식</strong>: 최소 4명, 짝수
              </li>
            </ul>
          </div>

          <DialogFooter className="mt-6 flex justify-center">
            <Button
              size="sm"
              variant="outline"
              className="text-black hover:text-black hover:bg-white"
              onClick={() => patchLeague()}
            >
              모집 마감 하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecruitmentInfoDialog;
