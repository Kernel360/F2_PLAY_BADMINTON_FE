import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/textarea';

interface League {
  leagueName: string;
  description: string;
  tierLimit: 'GOLD' | 'SILVER' | 'BRONZE';
  status: 'OPEN' | 'CLOSED';
  matchType: 'SINGLE' | 'DOUBLES';
  leagueAt: string;
  closedAt: string;
  playerCount: number;
  createdAt: string;
  modifiedAt: string;
  matchingRequirement: string;
}

const sampleLeague: League = {
  leagueName: 'example',
  description: 'description',
  tierLimit: 'GOLD',
  status: 'OPEN',
  matchType: 'SINGLE',
  leagueAt: '2024-09-30T05:53:45.509Z',
  closedAt: '2024-09-30T05:53:45.509Z',
  playerCount: 10,
  createdAt: '2024-09-30T05:53:45.509Z',
  modifiedAt: '2024-09-30T05:53:45.509Z',
  matchingRequirement: 'TIER',
};

function LeagueModal() {
  // TODO(iamgyu): 서버에서 데이터 받아오기
  const league = sampleLeague;

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-[100vw]">
        <div className="flex justify-center">
          <h2>{league.leagueName}</h2>
          <div className="flex gap-4">
            <Button>b1</Button>
            <Button>b2</Button>
            <Button>b3</Button>
          </div>
        </div>
        <Textarea>{league.description}</Textarea>
        <div className="flex gap-4 w-full">
          <span className="flex justify-center w-1/2 px-4 border-2 border-gray-400 rounded-md">
            {league.leagueAt}
          </span>
          <span className="flex justify-center w-1/2 px-4 border-2 border-gray-400 rounded-md">
            장소
          </span>
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          {league.tierLimit}
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          {league.closedAt}
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          {league.playerCount}
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          {league.matchType}
        </div>
        <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
          대진표 생성
        </div>
        <div>
          <p>경기결과</p>
          <div className="flex justify-center w-full px-4 border-2 border-gray-400 rounded-md">
            경기결과
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LeagueModal;
