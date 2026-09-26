// 会员中心账号状态：wiki 各处共用（导航栏登录按钮、资源中心）
import { useEffect, useSyncExternalStore } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

let state = { loaded: false, user: null, admin: false };
const listeners = new Set();
let loading = null;

function set(next) {
  state = { ...state, ...next };
  listeners.forEach(l => l());
}

export function useMemberBase() {
  return useDocusaurusContext().siteConfig.customFields.memberCenter;
}

export async function memberApi(base, path, body) {
  const opt = { credentials: 'include' };
  if (body !== undefined) {
    opt.method = 'POST';
    opt.headers = { 'content-type': 'application/json', 'x-cl': '1' };
    opt.body = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(base + path, opt);
  } catch {
    throw new Error('无法连接会员中心，请稍后再试');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || '请求失败');
    err.status = res.status;
    throw err;
  }
  return data;
}

export function refreshSession(base) {
  loading ??= memberApi(base, '/api/session')
    .then(d => set({ loaded: true, user: d.user, admin: d.admin }))
    .catch(() => set({ loaded: true, user: null, admin: false }))
    .finally(() => { loading = null; });
  return loading;
}

export function setUser(user) {
  set({ loaded: true, user });
}

export function useAccount() {
  const base = useMemberBase();
  const snap = useSyncExternalStore(
    l => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => state,
  );
  useEffect(() => { if (!state.loaded) refreshSession(base); }, [base]);
  return { ...snap, base };
}

// 任何地方都可以打开登录框：openLogin('register')
export function openLogin(mode = 'login') {
  window.dispatchEvent(new CustomEvent('cp-open-login', { detail: mode }));
}
