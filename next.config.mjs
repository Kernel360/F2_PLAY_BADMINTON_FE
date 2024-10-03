/** @type {import('next').NextConfig} */

// 스토리북 배포 디버깅 용
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.node = {
        __dirname: true, // 서버에서만 __dirname 활성화
      };
    }

    return config;
  },
};

export default nextConfig;
