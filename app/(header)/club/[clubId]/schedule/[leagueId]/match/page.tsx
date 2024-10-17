"use client";

import { Button } from "@/components/ui/Button";
import { useGetMatches } from "@/lib/api/hooks/matchHook";
import type { components } from "@/schemas/schema";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import MatchProfileDoubles from "./MatchProfileDoubles";
import MatchProfileSingles from "./MatchProfileSingles";

type MatchResponse = components["schemas"]["MatchResponse"];

const matches = [
  {
    id: 1,
    matchType: "SINGLES",
    singlesMatch: {
      participant1_name: "name1",
      participant1_image: "/images/dummy-image.jpg",
      participant2_name: "name2",
      participant2_image: "/images/dummy-image.jpg",
    },
  },
  {
    id: 2,
    matchType: "SINGLES",
    singlesMatch: {
      participant1_name: "name3",
      participant1_image: "/images/dummy-image.jpg",
      participant2_name: "name4",
      participant2_image: "/images/dummy-image.jpg",
    },
  },
  {
    id: 3,
    matchType: "SINGLES",
    singlesMatch: {
      participant1_name: "name5",
      participant1_image: "/images/dummy-image.jpg",
      participant2_name: "name6",
      participant2_image: "/images/dummy-image.jpg",
    },
  },
  {
    id: 4,
    matchType: "SINGLES",
    singlesMatch: {
      participant1_name: "name7",
      participant1_image: "/images/dummy-image.jpg",
      participant2_name: "name8",
      participant2_image: "/images/dummy-image.jpg",
    },
  },
  {
    id: 5,
    matchType: "SINGLES",
    singlesMatch: {
      participant1_name: "name9",
      participant1_image: "/images/dummy-image.jpg",
      participant2_name: "name10",
      participant2_image: "/images/dummy-image.jpg",
    },
  },
  {
    id: 6,
    matchType: "DOUBLES",
    doublesMatch: {
      team1: {
        participant1_name: "name1",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name2",
        participant2_image: "/images/dummy-image.jpg",
      },
      team2: {
        participant1_name: "name3",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name4",
        participant2_image: "/images/dummy-image.jpg",
      },
    },
  },
  {
    id: 7,
    matchType: "DOUBLES",
    doublesMatch: {
      team1: {
        participant1_name: "name1",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name2",
        participant2_image: "/images/dummy-image.jpg",
      },
      team2: {
        participant1_name: "name3",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name4",
        participant2_image: "/images/dummy-image.jpg",
      },
    },
  },
  {
    id: 8,
    matchType: "DOUBLES",
    doublesMatch: {
      team1: {
        participant1_name: "name1",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name2",
        participant2_image: "/images/dummy-image.jpg",
      },
      team2: {
        participant1_name: "name3",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name4",
        participant2_image: "/images/dummy-image.jpg",
      },
    },
  },
  {
    id: 9,
    matchType: "DOUBLES",
    doublesMatch: {
      team1: {
        participant1_name: "name1",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name2",
        participant2_image: "/images/dummy-image.jpg",
      },
      team2: {
        participant1_name: "name3",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name4",
        participant2_image: "/images/dummy-image.jpg",
      },
    },
  },
  {
    id: 10,
    matchType: "DOUBLES",
    doublesMatch: {
      team1: {
        participant1_name: "name1",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name2",
        participant2_image: "/images/dummy-image.jpg",
      },
      team2: {
        participant1_name: "name3",
        participant1_image: "/images/dummy-image.jpg",
        participant2_name: "name4",
        participant2_image: "/images/dummy-image.jpg",
      },
    },
  },
];

function MatchPage() {
  const params = useParams();
  const [matchTypes, setMatchTypes] = useState(true);
  const [matchDialog, setMatchDialog] = useState<number | null>(null);

  /* TODO: useParams를 이용하여 URL id 가져오기, id 타입 넣어주기 기본은 string*/
  const { data, isLoading, error } = useGetMatches(
    1,
    1,
    // Number(params.clubId),
    // Number(params.leagueId),
  );

  const [singleGames, doubleGames] = useMemo<
    [MatchResponse[], MatchResponse[]]
  >(() => {
    if (data) {
      const singleGames: MatchResponse[] = [];
      const doubleGames: MatchResponse[] = [];

      for (const match of data) {
        if (match.match_type === "SINGLES") {
          singleGames.push(match);
        } else if (match.match_type === "DOUBLES") {
          doubleGames.push(match);
        }
      }

      return [singleGames, doubleGames];
    }

    return [[], []];
  }, [data]);

  const toggleMatchDialog = (index: number) => {
    setMatchDialog((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMatchTypeSingles = () => {
    setMatchTypes(true);
  };

  const handleMatchTypeDoubles = () => {
    setMatchTypes(false);
  };

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button
          className="rounded-full h-2 py-4"
          onClick={handleMatchTypeSingles}
        >
          단식
        </Button>
        <Button
          className="rounded-full h-2 py-4"
          onClick={handleMatchTypeDoubles}
        >
          복식
        </Button>
      </div>
      {matchTypes ? (
        <div className="flex gap-10 w-full flex-wrap mt-5">
          {singleGames.map((match) => {
            if (!match.singles_match) {
              return null;
            }
            return (
              <button
                type="button"
                key={match.match_id}
                onClick={() => toggleMatchDialog(match.match_id as number)}
              >
                <MatchProfileSingles
                  singlesMatch={match.singles_match}
                  isOpen={matchDialog === match.match_id}
                  onClose={() => toggleMatchDialog(match.match_id as number)}
                />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-10 w-full flex-wrap mt-5">
          {doubleGames.map((match) => {
            if (!match.doubles_match) {
              return null;
            }
            return (
              <button
                type="button"
                key={match.match_id}
                onClick={() => toggleMatchDialog(match.match_id as number)}
              >
                <MatchProfileDoubles
                  doublesMatch={match.doubles_match}
                  isOpen={matchDialog === match.match_id}
                  onClose={() => toggleMatchDialog(match.match_id as number)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MatchPage;
