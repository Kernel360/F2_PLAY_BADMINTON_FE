import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function MatchScoreModal() {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>경기 1</DialogTitle>
      </DialogContent>
      <div className="flex flex-col">
        <div className="flex">세트 1</div>
        <div className="flex">세트 1</div>
        <div className="flex">세트 1</div>
      </div>
    </Dialog>
  );
}

export default MatchScoreModal;
