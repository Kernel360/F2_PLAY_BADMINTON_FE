"use client";

import React, { useState } from "react";
import MemberRollChange from "./MemberRollChange";

function MemberDropDown() {
  const [openRollChange, setOpenRollChange] = useState(false);

  const handleRollDialog = () => {
    setOpenRollChange(!openRollChange);
  };
  return (
    <>
      <div className="absolute top-12 right-0 w-24 bg-white border border-gray-400 rounded-md shadow-lg z-50">
        <ul className="py-2">
          <button type="button" onClick={handleRollDialog}>
            <li className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
              역할 변경
            </li>
          </button>
          <li className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
            정지
          </li>
          <li className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">
            탈퇴
          </li>
        </ul>
        {openRollChange && (
          <MemberRollChange
            openRollChange={openRollChange}
            handleRollDialog={handleRollDialog}
          />
        )}
      </div>
    </>
  );
}

export default MemberDropDown;
