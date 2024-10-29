"use client";

import MemberSuspendedModal from "@/components/club/MemberSuspendedModal";
import { useState } from "react";
import MemberExpelModal from "./MemberExpelModal";
import MemberRoleModal from "./MemberRoleModal";

function MemberDropDown({ clubMemberId }: { clubMemberId: number }) {
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openSuspendedModal, setOpenSuspendedModal] = useState(false);
  const [openExpelModal, setOpenExpelModal] = useState(false);

  const handleRoleModal = () => {
    setOpenRoleModal(!openRoleModal);
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
          <button type="button" className="w-full" onClick={handleRoleModal}>
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
        {openRoleModal && (
          <MemberRoleModal
            clubMemberId={clubMemberId}
            openRoleModal={openRoleModal}
            handleRoleModal={handleRoleModal}
          />
        )}
        {openSuspendedModal && (
          <MemberSuspendedModal
            clubMemberId={clubMemberId}
            openSuspendedModal={openSuspendedModal}
            handleSuspendedModal={handleSuspendedModal}
          />
        )}
        {openExpelModal && (
          <MemberExpelModal
            clubMemberId={clubMemberId}
            openExpelModal={openExpelModal}
            handleExpelModal={handleExpelModal}
          />
        )}
      </div>
    </>
  );
}

export default MemberDropDown;
