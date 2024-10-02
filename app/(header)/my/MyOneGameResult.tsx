import React from 'react';

function MyOneGameResult() {
  return (
    <div className="flex justify-between border-2 border-gray-400 p-4 rounded-md">
      <p className="text-lg font-bold">vs 경기 상대</p>
      <p className="text-lg font-bold">승</p>
      <p>00월 00일</p>
    </div>
  );
}

export default MyOneGameResult;
