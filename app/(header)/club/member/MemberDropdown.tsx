"use client";

import React, { useState } from "react";
import MemberRollChange from "./MemberRollChange";
import MemberSuspended from "./MemberSuspended";

function MemberDropDown() {
  const [openRollChange, setOpenRollChange] = useState(false);
  const [openSuspended, setOpenSuspended] = useState(false);

  const handleRollDialog = () => {
    setOpenRollChange(!openRollChange);
  };

  const handleSuspendedDialog = () => {
    setOpenSuspended(!openSuspended);
  };
  return (
    <>
      <div className="absolute top-12 right-0 w-24 bg-white border border-gray-400 rounded-md shadow-lg z-50">
        <ul className="py-2">
          <button type="button" className="w-full" onClick={handleRollDialog}>
            <li className="py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
              역할 변경
            </li>
          </button>
          <button
            type="button"
            className="w-full"
            onClick={handleSuspendedDialog}
          >
            <li className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
              정지
            </li>
          </button>
          <button type="button" className="w-full">
            <li className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">
              탈퇴
            </li>
          </button>
        </ul>
        {openRollChange && (
          <MemberRollChange
            openRollChange={openRollChange}
            handleRollDialog={handleRollDialog}
          />
        )}
        {openSuspended && (
          <MemberSuspended
            openSuspended={openSuspended}
            handleSuspendedDialog={handleSuspendedDialog}
          />
        )}
      </div>
    </>
  );
}

export default MemberDropDown;
