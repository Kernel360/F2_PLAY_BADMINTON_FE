import React from 'react';
import Header from '@/components/ui/Header';

function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isLogin={false} isJoined={false} />
      {children}
    </>
  );
}

export default HeaderLayout;
