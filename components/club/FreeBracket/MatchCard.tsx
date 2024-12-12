import SImage from "@/components/ui/Image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DoublesMatchType, SinglesMatchType } from "@/types/matchTypes";
import Link from "next/link";

interface MatchCardProps {
  clubId: string;
  leagueId: string;
  isDouble: boolean;
  match: SinglesMatchType | DoublesMatchType;
}

function MatchCard(props: MatchCardProps) {
  const { match, clubId, leagueId, isDouble } = props;
  return (
    <Link
      key={match.match_id}
      className="flex flex-col gap-6 sm:gap-8"
      href={`/club/${clubId}/league/${leagueId}/match/${match.match_id}`}
    >
      <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs font-semibold text-center mb-2 rounded-sm flex justify-center">
        round {match.round_number}
      </Badge>
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
            <SImage
              src={
                isDouble
                  ? (match as DoublesMatchType).team1?.participant1?.image ||
                    "/images/dummy-image.jpg"
                  : (match as SinglesMatchType).participant1?.image ||
                    "/images/dummy-image.jpg"
              }
              radius="circular"
              width={50}
              height={50}
              alt={
                isDouble
                  ? (match as DoublesMatchType).team1?.participant1?.name ||
                    "participant"
                  : (match as SinglesMatchType).participant1?.name ||
                    "participant"
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                    {isDouble
                      ? (match as DoublesMatchType).team1?.participant1?.name ||
                        ""
                      : (match as SinglesMatchType).participant1?.name || ""}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isDouble
                      ? (match as DoublesMatchType).team1?.participant1?.name
                      : (match as SinglesMatchType).participant1?.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isDouble && (
            <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
              <SImage
                src={
                  (match as DoublesMatchType).team1?.participant2?.image ||
                  "/images/dummy-image.jpg"
                }
                radius="circular"
                width={50}
                height={50}
                alt={
                  (match as DoublesMatchType).team1?.participant2?.name ||
                  "participant"
                }
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                      {(match as DoublesMatchType).team1?.participant2?.name ||
                        ""}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {(match as DoublesMatchType).team1?.participant2?.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2 text-xl font-semibold text-gray-900">
          <span>
            {isDouble
              ? (match as DoublesMatchType).team1?.team1_win_set_count || 0
              : (match as SinglesMatchType).participant1
                  ?.participant_win_set_count || 0}
          </span>
          <Separator className="my-2" />
          <span>
            {isDouble
              ? (match as DoublesMatchType).team2?.team1_win_set_count || 0
              : (match as SinglesMatchType).participant2
                  ?.participant_win_set_count || 0}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
            <SImage
              src={
                isDouble
                  ? (match as DoublesMatchType).team2?.participant1?.image ||
                    "/images/dummy-image.jpg"
                  : (match as SinglesMatchType).participant2?.image ||
                    "/images/dummy-image.jpg"
              }
              radius="circular"
              width={50}
              height={50}
              alt={
                isDouble
                  ? (match as DoublesMatchType).team2?.participant1?.name ||
                    "participant"
                  : (match as SinglesMatchType).participant2?.name ||
                    "participant"
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                    {isDouble
                      ? (match as DoublesMatchType).team2?.participant1?.name ||
                        ""
                      : (match as SinglesMatchType).participant2?.name || ""}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isDouble
                      ? (match as DoublesMatchType).team2?.participant1?.name
                      : (match as SinglesMatchType).participant2?.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isDouble && (
            <div className="flex flex-col items-center gap-2 w-full sm:w-1/2 lg:w-1/3">
              <SImage
                src={
                  (match as DoublesMatchType).team2?.participant2?.image ||
                  "/images/dummy-image.jpg"
                }
                radius="circular"
                width={50}
                height={50}
                alt={
                  (match as DoublesMatchType).team2?.participant2?.name ||
                  "participant"
                }
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-gray-800 text-sm font-semibold truncate max-w-[5rem] sm:max-w-[7rem] md:max-w-[8rem] block">
                      {(match as DoublesMatchType).team2?.participant2?.name ||
                        ""}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {(match as DoublesMatchType).team2?.participant2?.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MatchCard;
