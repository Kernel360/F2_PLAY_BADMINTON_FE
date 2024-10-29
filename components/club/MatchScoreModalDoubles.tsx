"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { components } from "@/schemas/schema";
import { useState } from "react";

type MatchResponse = components["schemas"]["MatchResponse"];

interface MatchScoreModalDoublesProps {
  doublesMatch: MatchResponse["doubles_match"];
  isOpen: boolean;
  onClose: () => void;
}

function MatchScoreModalDoubles({
  doublesMatch,
  isOpen,
  onClose,
}: MatchScoreModalDoublesProps) {
  const [team1Score, setTeam1Score] = useState<number[]>([0, 0, 0]);
  const [team2Score, setTeam2Score] = useState<number[]>([0, 0, 0]);
  const [team1SetScore, setTeam1SetScore] = useState<number>(0);
  const [team2SetScore, setTeam2SetScore] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState(0);

  const handleScorePlus = (team: number) => {
    if (team === 1) {
      setTeam1Score((prevTeam1Score) => {
        const newTeam1Score = [...prevTeam1Score];

        if (newTeam1Score[currentSet] === undefined) {
          newTeam1Score[currentSet] = 0;
        }

        newTeam1Score[currentSet]++;

        return newTeam1Score;
      });
    } else {
      setTeam2Score((prevTeam2Score) => {
        const newTeam2Score = [...prevTeam2Score];

        if (newTeam2Score[currentSet] === undefined) {
          newTeam2Score[currentSet] = 0;
        }

        newTeam2Score[currentSet]++;

        return newTeam2Score;
      });
    }
  };

  const handleScoreMinus = (team: number) => {
    if (team === 1) {
      setTeam1Score((prevTeam1Score) => {
        const newTeam1Score = [...prevTeam1Score];

        if (newTeam1Score[currentSet] === undefined) {
          newTeam1Score[currentSet] = 0;
        }

        if (newTeam1Score[currentSet] > 0) {
          newTeam1Score[currentSet]--;
        }

        return newTeam1Score;
      });
    } else {
      setTeam2Score((prevTeam2Score) => {
        const newTeam2Score = [...prevTeam2Score];

        if (newTeam2Score[currentSet] === undefined) {
          newTeam2Score[currentSet] = 0;
        }

        if (newTeam2Score[currentSet] > 0) {
          newTeam2Score[currentSet]--;
        }

        return newTeam2Score;
      });
    }
  };

  const handleCurrentSet = () => {
    if (team1Score[currentSet] === undefined) {
      team1Score[currentSet] = 0;
    }
    if (team2Score[currentSet] === undefined) {
      team2Score[currentSet] = 0;
    }

    if (team1Score[currentSet] > team2Score[currentSet]) {
      setTeam1SetScore(team1SetScore + 1);
    } else if (team2Score[currentSet] > team1Score[currentSet]) {
      setTeam2SetScore(team2SetScore + 1);
    }

    setCurrentSet(currentSet + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="text-black max-w-[750px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="w-full">
          <DialogTitle className="flex justify-center">경기 상세</DialogTitle>
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={doublesMatch?.team1?.participant1_image}
                  alt="user"
                  className="h-20 w-20 rounded-full"
                />
                <p className="text-black">
                  {doublesMatch?.team1?.participant1_name}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={doublesMatch?.team1?.participant2_image}
                  alt="user"
                  className="h-20 w-20 rounded-full"
                />
                <p className="text-black">
                  {doublesMatch?.team1?.participant2_name}
                </p>
              </div>
            </div>
            <p className="text-3xl font-bold">{team1SetScore}</p>
            <div className="flex flex-col gap-5">
              {[0, 1, 2].map((setIndex) => (
                <div key={setIndex}>
                  {setIndex === currentSet ? (
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative flex w-full justify-center">
                        <p className="flex items-center text-lg font-bold">
                          세트 {setIndex + 1}
                        </p>
                        <button
                          type="button"
                          className="absolute right-0 top-1 text-sm"
                          onClick={handleCurrentSet}
                        >
                          완료
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleScoreMinus(1)}
                          >
                            -
                          </button>
                          <p>{team1Score[setIndex]}</p>
                          <button
                            type="button"
                            onClick={() => handleScorePlus(1)}
                          >
                            +
                          </button>
                        </div>
                        <p>:</p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleScoreMinus(2)}
                          >
                            -
                          </button>
                          <p>{team2Score[setIndex]}</p>
                          <button
                            type="button"
                            onClick={() => handleScorePlus(2)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mb-4">
                      <p className="flex items-center text-lg font-bold">
                        세트 {setIndex + 1}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {team1Score[setIndex]} : {team2Score[setIndex]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-3xl font-bold">{team2SetScore}</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={doublesMatch?.team2?.participant1_image}
                  alt="user"
                  className="h-20 w-20 rounded-full"
                />
                <p className="text-black">
                  {doublesMatch?.team2?.participant1_name}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={doublesMatch?.team2?.participant2_image}
                  alt="user"
                  className="h-20 w-20 rounded-full"
                />
                <p className="text-black">
                  {doublesMatch?.team2?.participant2_name}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MatchScoreModalDoubles;
