interface ClubInfoInputNameProps {
  clubName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClubInfoInputName = ({ clubName, onChange }: ClubInfoInputNameProps) => {
  return (
    <input
      type="text"
      className="text-2xl font-bold text-black border border-gray-300 rounded-md p-1"
      value={clubName}
      onChange={onChange}
      placeholder={"이름을 입력하세요."}
    />
  );
};

export default ClubInfoInputName;
