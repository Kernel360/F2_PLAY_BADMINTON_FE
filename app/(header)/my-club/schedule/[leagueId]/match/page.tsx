"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import MatchProfileDoubles from "./MatchProfileDoubles";
import MatchProfileSingles from "./MatchProfileSingles";
import MatchScoreModal from "./MatchScoreModalSingles";

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
  const [matchTypes, setMatchTypes] = useState(true);
  const [matchDialog, setMatchDialog] = useState<number | null>(null);

  const toggleMatchDialog = (index: number) => {
    setMatchDialog((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMatchTypeSingles = () => {
    setMatchTypes(true);
  };

  const handleMatchTypeDoubles = () => {
    setMatchTypes(false);
  };

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
          {matches
            .filter((match) => match.matchType === "SINGLES")
            .map((match) =>
              match.singlesMatch ? (
                <button
                  type="button"
                  key={match.id}
                  onClick={() => toggleMatchDialog(match.id)}
                >
                  <MatchProfileSingles
                    singlesMatch={match.singlesMatch}
                    isOpen={matchDialog === match.id}
                    onClose={() => toggleMatchDialog(match.id)}
                  />
                </button>
              ) : null,
            )}
        </div>
      ) : (
        <div className="flex gap-10 w-full flex-wrap mt-5">
          {matches
            .filter((match) => match.matchType === "DOUBLES")
            .map((match) =>
              match.doublesMatch ? (
                <button
                  type="button"
                  key={match.id}
                  onClick={() => toggleMatchDialog(match.id)}
                >
                  <MatchProfileDoubles
                    key={match.id}
                    team1={match.doublesMatch.team1}
                    team2={match.doublesMatch.team2}
                    isOpen={matchDialog === match.id}
                    onClose={() => toggleMatchDialog(match.id)}
                  />
                </button>
              ) : null,
            )}
        </div>
      )}
    </div>
  );
}

export default MatchPage;
