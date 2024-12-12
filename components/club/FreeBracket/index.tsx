import type { GetMatchesData } from "@/types/matchTypes";
import { useParams } from "next/navigation";
import MatchCard from "./MatchCard";

interface FreeBracketProps {
  nodeData: GetMatchesData;
}

function FreeBracket(props: FreeBracketProps) {
  const { nodeData } = props;
  const { clubId, leagueId } = useParams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-3 sm:p-4">
      {nodeData.match_type === "SINGLES" &&
        nodeData.singles_match_response_list?.map((match) => (
          <MatchCard
            key={match.match_id}
            match={match}
            clubId={clubId as string}
            leagueId={leagueId as string}
            isDouble={false}
          />
        ))}
      {nodeData.match_type === "DOUBLES" &&
        nodeData.doubles_match_response_list?.map((match) => (
          <MatchCard
            key={match.match_id}
            match={match}
            clubId={clubId as string}
            leagueId={leagueId as string}
            isDouble={true}
          />
        ))}
    </div>
  );
}

export default FreeBracket;
