import MatchScoreModalSingles from "./MatchScoreModalSingles";

interface SinglesProps {
  singlesMatch: {
    participant1_name: string;
    participant1_image: string;
    participant2_name: string;
    participant2_image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

function MatchProfileSingles({ singlesMatch, isOpen, onClose }: SinglesProps) {
  const {
    participant1_name,
    participant1_image,
    participant2_name,
    participant2_image,
  } = singlesMatch;

  return (
    <div className="flex">
      <div className="flex rounded-md bg-gray-200 items-center w-72 p-2 justify-between">
        <div className="flex flex-col items-center gap-4">
          <img
            src={participant1_image}
            alt="user"
            className="h-20 w-20 rounded-full"
          />
          <p className="text-black">{participant1_name}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black">진행 완료</p>
          <p className="text-black text-2xl font-bold">2 vs 0</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={participant2_image}
            alt="user"
            className="h-20 w-20 rounded-full"
          />
          <p className="text-black">{participant2_name}</p>
        </div>
      </div>
      {isOpen && (
        <MatchScoreModalSingles
          isOpen={isOpen}
          singlesMatch={singlesMatch}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default MatchProfileSingles;
