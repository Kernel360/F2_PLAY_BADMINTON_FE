"use client";
import { useGetLoginState, usePostLogout } from "@/lib/api/hooks/SessionHook";
// import { useGetMyInfo } from "@/lib/api/hooks/memberHook";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import SImage from "./Image";
import { Input } from "./Input";
import { LinkText } from "./Text";

// const PersonalSection = () => {
//   // const { data: isLogin } = useGetLoginState();
//   const [showMenu, setShowMenu] = useState(false);
//   const { mutate: logout } = usePostLogout();
//   // TODO(Yejin0O0): 백엔드에 세션 확인하는 api 만들어달라고 한 후 로직 바꾸기 ( api 직접 만드는 것은 좋은 방법이 아님 )
//   // const { data } = useGetMyInfo(!!isLogin?.loggedIn);
//   // const clubId = data?.club_member_my_page_response?.club_id || null;
//   const router = useRouter();

//   const handleProfileClick = () => {
//     setShowMenu(!showMenu);
//   };

//   const handleLogout = () => {
//     logout(undefined, {
//       onSuccess: () => {
//         router.push("/");
//       },
//     });
//   };

// if (!isLogin?.loggedIn) {
//   return (
//     <div className="flex w-44 justify-evenly">
//       <LinkText
//         color="gray"
//         size="sm"
//         align="center"
//         className="cursor-pointer leading-6 items-center"
//         link="/login"
//       >
//         동호회 만들기
//       </LinkText>
//       <LinkText
//         color="primary"
//         size="sm"
//         className="cursor-pointer leading-6"
//         link="/login"
//       >
//         Login
//       </LinkText>
//     </div>
//   );
// }

// return (
//   <div className="relative flex items-center">
//     {!clubId ? (
//       <LinkText
//         color="gray"
//         size="sm"
//         align="center"
//         className="cursor-pointer leading-6 mr-4"
//         link="/club/create"
//       >
//         동호회 만들기
//       </LinkText>
//     ) : null}

//     <button
//       onClick={() => handleProfileClick()}
//       className="cursor-pointer"
//       type="button"
//     >
//       <SImage
//         src={data?.profile_image || "/images/dummy-image.jpg"}
//         radius="circular"
//         width={45}
//         height={45}
//         alt="profile"
//       />
//     </button>

//     {showMenu && (
//       <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg p-3 rounded w-40 space-y-2">
//         {clubId && (
//           <div>
//             <LinkText
//               color="primary"
//               size="sm"
//               className="block cursor-pointer hover:underline"
//               link={`/club/${clubId}`}
//             >
//               내 동호회
//             </LinkText>
//           </div>
//         )}
//         <div>
//           <LinkText
//             color="primary"
//             size="sm"
//             className="block cursor-pointer hover:underline"
//             link="/my"
//           >
//             마이페이지
//           </LinkText>
//         </div>
//         <div>
//           <button
//             onClick={() => handleLogout()}
//             type="button"
//             className="block w-full text-left text-primary text-sm cursor-pointer hover:underline"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );
// };

function Header() {
  const path = usePathname();
  return (
    <div className="flex items-center justify-between space-x-4 w-full max-w-5xl h-16 sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/">
        <div className="text-xl font-semibold cursor-pointer">LOGO</div>
      </Link>
      <div className="flex items-center justify-end space-x-2 w-1/2">
        {/* {path === "/" && (
          <div className="w-1/2">
            <Input search radius="round" placeholder="" size="sm" />
          </div>
        )} */}
        {/* <PersonalSection /> */}
      </div>
    </div>
  );
}

export default Header;
