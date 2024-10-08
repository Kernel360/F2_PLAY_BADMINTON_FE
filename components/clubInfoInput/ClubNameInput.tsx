import type React from "react";

interface ClubNameInputProps {
  clubName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClubNameInput = ({ clubName, onChange }: ClubNameInputProps) => {
  return (
    <input
      type="text"
      className="text-3xl font-bold text-black border border-gray-300 rounded-md p-1"
      value={clubName}
      onChange={onChange}
    />
  );
};

export default ClubNameInput;
