"use client";

import ClubForm from "@/components/club/ClubForm";

function ClubCreate() {
  return (
    <div className="w-full my-10">
      <h1 className="text-xl font-bold text-black ">동호회 생성하기</h1>
      <ClubForm />
    </div>
  );
}

export default ClubCreate;
