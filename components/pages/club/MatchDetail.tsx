import SImage from "@/components/ui/Image";
import { Badge } from "@/components/ui/badge";
import { getTierWithEmoji } from "@/utils/getTier";
import Image from "next/image";
import React from "react";

const ScoreCard = () => {
  return (
    <>
      <div className="flex items-center justify-evenly flex-col w-full gap-6 min-h-[500px]">
        <div className="grid grid-cols-3 gap-6 items-center mb-6 w-2/3">
          {/* Player 1 */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="/images/dummy-image.jpg"
                alt="Player 1"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-lg text-gray-800">
              {getTierWithEmoji("GOLD")}LeeKaChang
            </span>
          </div>

          {/* VS */}
          <div className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            VS
          </div>

          {/* Player 2 */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="/images/dummy-image.jpg"
                alt="Player 2"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-lg text-gray-800">
              {getTierWithEmoji("SILVER")}LeeKaChang
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center w-2/3">
          <div className="flex flex-col items-center justify-center space-y-2 min-h-12">
            <span className="text-xl font-bold text-gray-700">21</span>
            <span className="text-xl font-bold text-gray-700">2</span>
            <span className="text-xl font-bold text-gray-700">25</span>
            <span className="text-xl font-bold text-gray-700">2</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 min-h-12">
            <Badge className="bg-yellow-300 hover:bg-yellow-300 text-base font-semibold text-center rounded-sm w-16 flex justify-center items-center">
              1세트
            </Badge>
            <Badge className="bg-yellow-400 hover:bg-yellow-400 text-base font-semibold text-center rounded-sm w-16 flex justify-center items-center">
              2세트
            </Badge>
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-base font-semibold text-center rounded-sm w-16 flex justify-center items-center">
              3세트
            </Badge>
            <Badge className="bg-yellow-600 hover:bg-yellow-600 text-base font-semibold text-center rounded-sm w-16 flex justify-center items-center">
              결과
            </Badge>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 min-h-12">
            <span className="text-xl font-bold text-gray-700">21</span>
            <span className="text-xl font-bold text-gray-700">2</span>
            <span className="text-xl font-bold text-gray-700">25</span>
            <span className="text-xl font-bold text-gray-700">2</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
