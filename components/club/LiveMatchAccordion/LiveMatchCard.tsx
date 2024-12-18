import SImage from "@/components/ui/Image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GetMainLeaguesMatchData } from "@/types/mainLeagueTypes";

interface LiveMatchCardProps {
  match: GetMainLeaguesMatchData;
}

function LiveMatchCard(props: LiveMatchCardProps) {
  const { match } = props;
  const isDouble = !!match.doubles_match_player_response;

  const getTeams = () => {
    if (isDouble && match.doubles_match_player_response) {
      const {
        participant1_name,
        participant1_image,
        participant2_name,
        participant2_image,
        participant3_name,
        participant3_image,
        participant4_name,
        participant4_image,
      } = match.doubles_match_player_response;

      return {
        team1: [
          { name: participant1_name, image: participant1_image },
          { name: participant2_name, image: participant2_image },
        ],
        team2: [
          { name: participant3_name, image: participant3_image },
          { name: participant4_name, image: participant4_image },
        ],
      };
    }

    if (match.singles_match_player_response) {
      const {
        participant1_name,
        participant1_image,
        participant2_name,
        participant2_image,
      } = match.singles_match_player_response;

      return {
        team1: [{ name: participant1_name, image: participant1_image }],
        team2: [{ name: participant2_name, image: participant2_image }],
      };
    }

    return { team1: [], team2: [] }; // 데이터가 없을 경우 빈 배열 반환
  };

  const teams = getTeams();

  const renderParticipant = (participant: { name: string; image: string }) => (
    <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
      <SImage
        src={participant.image || "/images/dummy-image.jpg"}
        radius="circular"
        width={50}
        height={50}
        alt={participant.name || "participant"}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
              {participant.name}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{participant.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm flex justify-center">
        {`${match.round_number}라운드 -  ${match.set_number}세트`}
      </Badge>

      {/* 팀 1 */}
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4">
          {teams.team1.map((participant) => renderParticipant(participant))}
        </div>
        <div className="text-xl font-semibold text-gray-900">
          {match.set_score1 || 0}
        </div>
      </div>

      <Separator className="my-2" />

      {/* 팀 2 */}
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4">
          {teams.team2.map((participant) => renderParticipant(participant))}
        </div>
        <div className="text-xl font-semibold text-gray-900">
          {match.set_score2 || 0}
        </div>
      </div>
    </div>
  );
}

export default LiveMatchCard;
