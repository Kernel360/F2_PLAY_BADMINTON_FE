import { Button } from "@/components/ui/Button";

interface OverlayMessageProps {
  matchStatus: "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
  postMatchStart?: () => void;
}

function OverlayMessage({ matchStatus, postMatchStart }: OverlayMessageProps) {
  if (matchStatus === "IN_PROGRESS") return null;

  if (matchStatus === "NOT_STARTED")
    return (
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-10">
        <Button
          onClick={postMatchStart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-sm"
        >
          경기 시작하기
        </Button>
      </div>
    );

  if (matchStatus === "FINISHED")
    return (
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-10">
        <div className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold">
          종료된 경기 입니다
        </div>
      </div>
    );
}

export default OverlayMessage;
