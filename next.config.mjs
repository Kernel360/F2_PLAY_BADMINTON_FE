/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "badminton-team.s3.ap-northeast-2.amazonaws.com",
      "ssl.pstatic.net", // 네이버 프로필 사진
      "lh3.googleusercontent.com", // 구글 프로필 사진
    ],
  },
};

export default nextConfig;
