interface DoublesProps {
  team1: {
    participant1_name: string;
    participant1_image: string;
    participant2_name: string;
    participant2_image: string;
  };
  team2: {
    participant1_name: string;
    participant1_image: string;
    participant2_name: string;
    participant2_image: string;
  };
}

function MatchProfileSingles({ team1, team2 }: DoublesProps) {
  return (
    <div className="flex">
      <div className="flex rounded-md bg-gray-200 items-center w-[450px] p-2 justify-between">
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-4">
            <img
              src={team1.participant1_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{team1.participant1_name}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src={team1.participant2_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{team1.participant2_name}</p>
          </div>
        </div>
        <p className="text-black text-xl font-bold">1 vs 1</p>
        <div className="flex gap-2">
          <div className="flex flex-col items-center gap-4">
            <img
              src={team2.participant1_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{team2.participant1_name}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src={team2.participant2_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{team2.participant2_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MatchProfileSingles;
