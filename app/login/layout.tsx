import React from 'react';
import LoginButton from './LoginButton';
function LoginLayout() {
  return (
    <div>
      <LoginButton method="naver" />
      <LoginButton method="google" />
      <LoginButton method="kakao" />
    </div>
  );
}

export default LoginLayout;
