import React, { useEffect, useState } from 'react';
import { memberApi, refreshSession, useMemberBase } from './store';
import styles from './styles.module.css';

export default function LoginModal() {
  const base = useMemberBase();
  const [mode, setMode] = useState(null); // null = 关闭
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [welcome, setWelcome] = useState(null);

  useEffect(() => {
    const open = e => { setMode(e.detail || 'login'); setError(''); setWelcome(null); };
    window.addEventListener('cp-open-login', open);
    return () => window.removeEventListener('cp-open-login', open);
  }, []);

  useEffect(() => {
    if (!mode) return undefined;
    const esc = e => { if (e.key === 'Escape') setMode(null); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [mode]);

  if (!mode) return null;

  const submit = async e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    if (mode === 'register' && f.password !== f.password2) { setError('两次输入的密码不一致'); return; }
    setBusy(true);
    setError('');
    try {
      const r = await memberApi(base, '/api/' + mode, f);
      await refreshSession(base);
      if (mode === 'register') setWelcome(r.uid);
      else setMode(null);
    } catch (x) {
      setError(x.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.backdrop} onMouseDown={e => { if (e.target === e.currentTarget) setMode(null); }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={mode === 'login' ? '登录' : '注册'}>
        <button className={styles.close} onClick={() => setMode(null)} aria-label="关闭">×</button>
        {welcome ? (
          <div className={styles.welcome}>
            <div className={styles.kicker}>注册成功</div>
            <div className={styles.uidLabel}>你的 UID</div>
            <div className={styles.uid}>{welcome}</div>
            <p>购买付费资源时，把 UID 发给作者即可开通；免费资源可以直接领取。</p>
            <button className={styles.primary} onClick={() => setMode(null)}>开始浏览</button>
          </div>
        ) : (
          <>
            <div className={styles.brand}>云插件会员中心</div>
            <div className={styles.tabs}>
              <button className={mode === 'login' ? styles.tabOn : ''} onClick={() => { setMode('login'); setError(''); }}>登录</button>
              <button className={mode === 'register' ? styles.tabOn : ''} onClick={() => { setMode('register'); setError(''); }}>注册</button>
            </div>
            <form onSubmit={submit} key={mode}>
              <label className={styles.field}><span>用户名</span>
                <input name="username" autoComplete="username" required maxLength={20} autoFocus /></label>
              <label className={styles.field}><span>密码{mode === 'register' ? '（至少 8 位）' : ''}</span>
                <input name="password" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required /></label>
              {mode === 'register' && (
                <>
                  <label className={styles.field}><span>确认密码</span>
                    <input name="password2" type="password" autoComplete="new-password" required /></label>
                  <label className={styles.field}><span>QQ / 联系方式（选填）</span>
                    <input name="contact" maxLength={64} /></label>
                </>
              )}
              <div className={styles.error}>{error}</div>
              <button className={styles.primary} disabled={busy} type="submit">
                {busy ? '请稍候…' : mode === 'login' ? '登录' : '注册并获取 UID'}
              </button>
            </form>
            {mode === 'login' && <p className={styles.hint}>忘记密码请在交流群联系作者重置</p>}
          </>
        )}
      </div>
    </div>
  );
}
