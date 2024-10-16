"use client";

import React, { useState } from "react";
import MemberExpelModal from "./MemberExpelModal";
import MemberRollModal from "./MemberRollModal";
import MemberSuspendedModal from "./MemberSuspendedModal";

function MemberDropDown() {
  const [openRollModal, setOpenRollModal] = useState(false);
  const [openSuspendedModal, setOpenSuspendedModal] = useState(false);
  const [openExpelModal, setOpenExpelModal] = useState(false);

  const handleRollModal = () => {
    setOpenRollModal(!openRollModal);
  };

  const handleSuspendedModal = () => {
    setOpenSuspendedModal(!openSuspendedModal);
  };

  const handleExpelModal = () => {
    setOpenExpelModal(!openExpelModal);
  };

  return (
    <>
      <div className="absolute top-12 right-0 w-24 bg-white border border-gray-400 rounded-md shadow-lg z-50">
        <ul className="py-2">
          <button type="button" className="w-full" onClick={handleRollModal}>
            <li className="py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
              역할 변경
            </li>
          </button>
          <button
            type="button"
            className="w-full"
            onClick={handleSuspendedModal}
          >
            <li className="px-4 py-2 text-gray-400 hover:bg-gray-100 cursor-pointer">
              정지
            </li>
          </button>
          <button type="button" className="w-full" onClick={handleExpelModal}>
            <li className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">
              내보내기
            </li>
          </button>
        </ul>
        {openRollModal && (
          <MemberRollModal
            openRollModal={openRollModal}
            handleRollModal={handleRollModal}
          />
        )}
        {openSuspendedModal && (
          <MemberSuspendedModal
            openSuspendedModal={openSuspendedModal}
            handleSuspendedModal={handleSuspendedModal}
          />
        )}
        {openExpelModal && (
          <MemberExpelModal
            openExpelModal={openExpelModal}
            handleExpelModal={handleExpelModal}
          />
        )}
      </div>
    </>
  );
}

export default MemberDropDown;
