"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
import { useState } from "react";

interface MatchScoreModalProps {
  singlesMatch: {
    participant1_name: string;
    participant1_image: string;
    participant2_name: string;
    participant2_image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

function MatchScoreModal({
  isOpen,
  singlesMatch,
  onClose,
}: MatchScoreModalProps) {
  const {
    participant1_name,
    participant1_image,
    participant2_name,
    participant2_image,
  } = singlesMatch;

  const [p1Score, setP1Score] = useState<number[]>([0, 1, 2]);
  const [p2Score, setP2Score] = useState<number[]>([0, 1, 2]);
  const [p1SetScore, setP1SetScore] = useState<number>(0);
  const [p2SetScore, setP2SetScore] = useState<number>(0);
  const [currentSet, setCurrentSet] = useState(0);

  const handleScorePlus = (player: number) => {
    if (player === 1) {
      setP1Score((prevP1Score) => {
        const newP1Score = [...prevP1Score];

        if (newP1Score[currentSet] === undefined) {
          newP1Score[currentSet] = 0;
        }

        newP1Score[currentSet]++;

        return newP1Score;
      });
    } else {
      setP2Score((prevP2Score) => {
        const newP2Score = [...prevP2Score];

        if (newP2Score[currentSet] === undefined) {
          newP2Score[currentSet] = 0;
        }

        newP2Score[currentSet]++;

        return newP2Score;
      });
    }
  };

  const handleScoreMinus = (player: number) => {
    if (player === 1) {
      setP1Score((prevP1Score) => {
        const newP1Score = [...prevP1Score];

        if (newP1Score[currentSet] === undefined) {
          newP1Score[currentSet] = 0;
        }

        if (newP1Score[currentSet] > 0) {
          newP1Score[currentSet]--;
        }

        return newP1Score;
      });
    } else {
      setP2Score((prevP2Score) => {
        const newP2Score = [...prevP2Score];

        if (newP2Score[currentSet] === undefined) {
          newP2Score[currentSet] = 0;
        }
        if (newP2Score[currentSet] > 0) {
          newP2Score[currentSet]--;
        }

        return newP2Score;
      });
    }
  };

  const handleCurrentSet = () => {
    if (p1Score[currentSet] === undefined) {
      p1Score[currentSet] = 0;
    }
    if (p2Score[currentSet] === undefined) {
      p2Score[currentSet] = 0;
    }

    if (p1Score[currentSet] > p2Score[currentSet]) {
      setP1SetScore(p1SetScore + 1);
    } else if (p2Score[currentSet] > p1Score[currentSet]) {
      setP2SetScore(p2SetScore + 1);
    }

    setCurrentSet(currentSet + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="w-full">
          <DialogTitle className="flex justify-center">경기 상세</DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col items-center gap-4">
            <img
              src={participant1_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{participant1_name}</p>
          </div>
          <p className="text-3xl font-bold">{p1SetScore}</p>
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
                        <p>{p1Score[setIndex]}</p>
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
                        <p>{p2Score[setIndex]}</p>
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
                      {p1Score[setIndex]} : {p2Score[setIndex]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-3xl font-bold">{p2SetScore}</p>
          <div className="flex flex-col items-center gap-4">
            <img
              src={participant2_image}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <p className="text-black">{participant2_name}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MatchScoreModal;
