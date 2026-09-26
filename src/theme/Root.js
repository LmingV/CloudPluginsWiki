import React from 'react';
import LoginModal from '@site/src/components/Account/LoginModal';

// 全站挂载登录框（导航栏和资源中心都用 openLogin() 打开）
export default function Root({ children }) {
  return (
    <>
      {children}
      <LoginModal />
    </>
  );
}
