import React, { useEffect, useRef, useState } from 'react';
import { memberApi, openLogin, setUser, useAccount } from './store';
import styles from './styles.module.css';

// 导航栏右上角：未登录显示「登录」，已登录显示用户名 + 下拉菜单
export default function AccountNavbarItem({ mobile }) {
  const { loaded, user, admin, base } = useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const logout = async () => {
    try { await memberApi(base, '/api/logout', {}); } catch { /* 已离线也照样清掉本地状态 */ }
    setUser(null);
    setOpen(false);
  };

  if (mobile) {
    return (
      <li className="menu__list-item">
        {user ? (
          <>
            <a className="menu__link" href={base + '/'} target="_blank" rel="noopener">会员中心 · {user.username}</a>
            {admin && <a className="menu__link" href={base + '/#admin'} target="_blank" rel="noopener">管理后台</a>}
            <button className={`menu__link ${styles.mobileBtn}`} onClick={logout}>退出登录</button>
          </>
        ) : (
          <button className={`menu__link ${styles.mobileBtn}`} onClick={() => openLogin()}>登录 / 注册</button>
        )}
      </li>
    );
  }

  if (!loaded) return <span className={styles.navPlaceholder} />;
  if (!user) {
    return <button className={styles.navLogin} onClick={() => openLogin()}>登录</button>;
  }
  return (
    <div className={styles.navUser} ref={ref}>
      <button className={styles.navUserBtn} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className={styles.avatar}>{user.username.slice(0, 1).toUpperCase()}</span>
        <span className={styles.navName}>{user.username}</span>
        <span className={styles.caret}>▾</span>
      </button>
      {open && (
        <div className={styles.menu}>
          <div className={styles.menuHead}>
            <b>{user.username}</b>
            <span>UID {user.uid}</span>
          </div>
          <a href="/resources" onClick={() => setOpen(false)}>资源中心</a>
          <a href={base + '/'} target="_blank" rel="noopener">我的授权 ↗</a>
          {admin && (
            <>
              <div className={styles.menuSep} />
              <a href={base + '/#admin'} target="_blank" rel="noopener">管理后台 · 开通授权 ↗</a>
              <a href={base + '/#products'} target="_blank" rel="noopener">资源管理 ↗</a>
            </>
          )}
          <button onClick={logout}>退出登录</button>
        </div>
      )}
    </div>
  );
}
