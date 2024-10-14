"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface MatchScoreModalDoublesProps {
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
  isOpen: boolean;
  onClose: () => void;
}

function MatchScoreModalDoubles({
  team1,
  team2,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="w-full">
          <DialogTitle className="flex justify-center">경기 상세</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default MatchScoreModalDoubles;
