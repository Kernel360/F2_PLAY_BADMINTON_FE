import { forwardRef } from "react";

interface ClubInfoInputNameProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clubName?: string;
}

const ClubInfoInputName = forwardRef<HTMLInputElement, ClubInfoInputNameProps>(
  (props, ref) => {
    const { clubName, ...rest } = props;
    return (
      <input
        type="text"
        className="text-2xl font-bold text-black border border-gray-300 rounded-md p-1"
        placeholder="이름을 입력하세요"
        ref={ref}
        defaultValue={clubName} // clubName은 사용하되, DOM에 전달하지 않음
        {...rest} // 나머지 props 전달
      />
    );
  },
);

ClubInfoInputName.displayName = "ClubInfoInputName";

export default ClubInfoInputName;
