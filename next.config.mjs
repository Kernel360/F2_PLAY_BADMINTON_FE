/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  images: {
    domains: [
      "localhost",
      "badminton-team.s3.ap-northeast-2.amazonaws.com",
      "ssl.pstatic.net", // 네이버 프로필 사진
      "lh3.googleusercontent.com", // 구글 프로필 사진
      "k.kakaocdn.net", // 카카오 프로필 사진
      "img1.kakaocdn.net", // 카카오 프로필 사진
      "d36om9pjoifd2y.cloudfront.net",
      "avatar.iran.liara.run",
    ],
  },
};

export default nextConfig;
