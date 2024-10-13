import { forwardRef } from "react";

interface ClubInfoInputNameProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ClubInfoInputName = forwardRef<HTMLInputElement, ClubInfoInputNameProps>(
  (props, ref) => {
    return (
      <input
        type="text"
        className="text-2xl font-bold text-black border border-gray-300 rounded-md p-1"
        placeholder="이름을 입력하세요."
        ref={ref}
        {...props}
      />
    );
  },
);

ClubInfoInputName.displayName = "ClubInfoInputName";

export default ClubInfoInputName;
