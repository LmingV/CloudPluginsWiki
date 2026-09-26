import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { memberApi, openLogin, useAccount } from '@site/src/components/Account/store';
import styles from './resources.module.css';

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'plugin', label: '插件' },
  { id: 'model', label: '模型' },
  { id: 'bundle', label: '整合包' },
  { id: 'other', label: '其他' },
];
const PRICES = [
  { id: 'all', label: '全部' },
  { id: 'paid', label: '付费' },
  { id: 'free', label: '免费' },
];
// 没有封面图时按 slug 固定挑一组品牌色
const COVER_PALETTES = [
  ['#8b7bff', '#4fb8ff'], ['#b36bff', '#ff7ac6'], ['#4fb8ff', '#3ee0c5'],
  ['#ff9f5a', '#ff5f8f'], ['#6d7bff', '#b86bff'], ['#38c7ff', '#7a8bff'],
];
const CATEGORY_LABEL = { plugin: '插件', model: '模型', bundle: '整合包', other: '其他' };

function Cover({ item, large }) {
  if (item.cover) {
    return <img className={large ? styles.detailCover : styles.cover} src={item.cover} alt={item.name} loading="lazy" />;
  }
  const [c1, c2] = COVER_PALETTES[[...item.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % COVER_PALETTES.length];
  return (
    <div className={`${large ? styles.detailCover : styles.cover} ${styles.coverGen}`}
         style={{ '--c1': c1, '--c2': c2 }}>
      <span className={styles.coverName}>{item.name}</span>
      {item.cn && <span className={styles.coverCn}>{item.cn}</span>}
    </div>
  );
}

function PriceTag({ item }) {
  if (item.owned) return <span className={`${styles.priceTag} ${styles.owned}`}>✓ {item.free ? '已领取' : '已购买'}</span>;
  if (item.status === 'soon') return <span className={`${styles.priceTag} ${styles.soon}`}>开发中</span>;
  if (item.free) return <span className={`${styles.priceTag} ${styles.free}`}>可领取</span>;
  return <span className={`${styles.priceTag} ${styles.paid}`}>付费 · {item.price}</span>;
}

function MainAction({ item, onClaim, onBuy, base, busy, buyHref }) {
  if (item.status === 'soon') return <button className={styles.btnMain} disabled>敬请期待</button>;
  if (item.owned) return <a className={`${styles.btnMain} ${styles.btnOwned}`} href={base + '/'} target="_blank" rel="noopener">查看授权</a>;
  if (item.free) return <button className={`${styles.btnMain} ${styles.btnFree}`} onClick={() => onClaim(item)} disabled={busy}>{busy ? '领取中…' : '免费领取'}</button>;
  if (buyHref) return <a className={`${styles.btnMain} ${styles.btnPaid}`} href={buyHref} target="_blank" rel="noopener">联系作者购买</a>;
  return <button className={`${styles.btnMain} ${styles.btnPaid}`} onClick={() => onBuy(item)}>购买</button>;
}

function Card({ item, ...actions }) {
  return (
    <article className={styles.card}>
      <button className={styles.coverBtn} onClick={() => actions.onOpen(item)} aria-label={`${item.name} 详情`}>
        <Cover item={item} />
      </button>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{CATEGORY_LABEL[item.category] || '资源'}</span>
          {item.version && <span>v{item.version}</span>}
        </div>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.summary}>
          {item.cn && <b>{item.cn}</b>}{item.cn && ' · '}{item.summary}
        </p>
        <div className={styles.tags}>
          {item.mc && <span>{item.mc}</span>}
          {item.docUrl && <span>有文档</span>}
          <span>{item.claims} 次获取</span>
        </div>
        <div className={styles.foot}>
          <PriceTag item={item} />
          <div className={styles.actions}>
            <button className={styles.btnGhost} onClick={() => actions.onOpen(item)}>详情</button>
            {item.docUrl && <Link className={styles.btnGhost} to={item.docUrl}>文档</Link>}
            <MainAction item={item} {...actions} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Detail({ item, user, qqGroup, onClose, ...actions }) {
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  const how = item.status === 'soon'
    ? '正在开发中，上线后会在这里开放获取。'
    : item.owned
      ? (item.free ? '你已经领取了这个资源' : '你已经购买了这个资源') + '，可以在会员中心查看授权码。'
      : item.free
        ? '登录后点击领取，授权码会直接加入你的账号，并可继续获取后续更新。'
        : null;

  return (
    <div className={styles.backdrop} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.detail} role="dialog" aria-modal="true" aria-label={item.name}>
        <header className={styles.detailHead}>
          <div>
            <div className={styles.detailBadges}>
              <PriceTag item={item} />
              <span className={styles.chip}>{CATEGORY_LABEL[item.category] || '资源'}</span>
              {item.version && <span className={styles.chip}>版本 v{item.version}</span>}
              {item.mc && <span className={styles.chip}>{item.mc}</span>}
            </div>
            <h2>{item.name}{item.cn && <small> {item.cn}</small>}</h2>
          </div>
          <button className={styles.detailClose} onClick={onClose}>✕ 关闭</button>
        </header>
        <div className={styles.detailGrid}>
          <div className={styles.detailMain}>
            <Cover item={item} large />
            <p className={styles.detailSummary}>{item.summary}</p>
            {item.description && <div className={styles.detailDesc}>{item.description}</div>}
          </div>
          <aside className={styles.side}>
            <div className={styles.sideKicker}>获取方式</div>
            <div className={`${styles.sidePrice} ${item.owned ? styles.sideOwned : item.free ? styles.sideFree : styles.sidePaid}`}>
              {item.status === 'soon' ? '开发中' : item.owned ? (item.free ? '已领取' : '已购买') : item.free ? '免费领取' : item.price}
            </div>
            {how && <p className={styles.sideText}>{how}</p>}
            {!how && (
              <ol className={styles.buySteps}>
                <li>{user ? <>你的 UID 是 <b className={styles.mono}>{user.uid}</b></> : <><button className={styles.inlineLink} onClick={() => openLogin('register')}>注册会员</button>，获取你的 UID</>}</li>
                <li>加入交流群联系作者付款，并发送 UID</li>
                <li>开通后授权码会出现在会员中心</li>
              </ol>
            )}
            <div className={styles.sideButtons}>
              {item.docUrl && <Link className={styles.sideBtn} to={item.docUrl}>📖 查看资源文档</Link>}
              {qqGroup && <a className={styles.sideBtn} href={qqGroup} target="_blank" rel="noopener">💬 交流群 · 问题与建议</a>}
              {item.docUrl && <Link className={styles.sideBtn} to={item.docUrl.replace(/\/$/, '') + '/changelog'}>🔔 更新记录</Link>}
              <MainAction item={item} {...actions} buyHref={qqGroup} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const { siteConfig } = useDocusaurusContext();
  const qqGroup = siteConfig.customFields.qqGroup;
  const { user, base } = useAccount();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [cat, setCat] = useState('all');
  const [price, setPrice] = useState('all');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(null);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    try {
      const d = await memberApi(base, '/api/catalog');
      setItems(d.items);
      setError('');
    } catch (x) {
      setError(x.message);
      setItems([]);
    }
  }, [base]);

  // 登录 / 退出后重新拉取「已拥有」状态
  useEffect(() => { load(); }, [load, user?.uid]);
  useEffect(() => { if (open && items) setOpen(items.find(i => i.slug === open.slug) || null); }, [items]);
  useEffect(() => { if (!toast) return undefined; const t = setTimeout(() => setToast(''), 2600); return () => clearTimeout(t); }, [toast]);

  const onClaim = async item => {
    if (!user) { openLogin(); return; }
    setBusy(item.slug);
    try {
      const r = await memberApi(base, `/api/catalog/${item.slug}/claim`, {});
      setToast(r.already ? '你已经领取过了，授权码在会员中心' : '领取成功！授权码已加入你的会员中心');
      await load();
    } catch (x) {
      if (x.status === 401) openLogin(); else setToast(x.message);
    } finally {
      setBusy(null);
    }
  };
  const actions = { onClaim, onBuy: setOpen, onOpen: setOpen, base, busy: false };

  const shown = useMemo(() => (items || []).filter(i =>
    (cat === 'all' || i.category === cat)
    && (price === 'all' || (price === 'free' ? i.free : !i.free))
    && (!query || `${i.name} ${i.cn || ''} ${i.summary || ''}`.toLowerCase().includes(query.toLowerCase()))), [items, cat, price, query]);

  const count = (key, id) => (items || []).filter(i => key === 'cat'
    ? (id === 'all' || i.category === id)
    : (id === 'all' || (id === 'free' ? i.free : !i.free))).length;

  return (
    <Layout title="资源中心" description="云系列插件与资源：付费与免费资源一览，登录后领取或查看授权。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.kicker}>RESOURCES</div>
          <h1>资源中心</h1>
          <p>云系列插件与资源一览。免费资源登录即可领取，付费资源开通后授权码会出现在你的会员中心。</p>
          {!user && (
            <div className={styles.heroActions}>
              <button className={styles.heroPrimary} onClick={() => openLogin('register')}>注册会员</button>
              <button className={styles.heroGhost} onClick={() => openLogin()}>已有账号，登录</button>
            </div>
          )}
        </section>

        <section className={styles.filters}>
          <input className={styles.search} placeholder="搜索资源…" value={query} onChange={e => setQuery(e.target.value)} />
          <div className={styles.chips}>
            {CATEGORIES.filter(c => c.id === 'all' || count('cat', c.id) > 0).map(c => (
              <button key={c.id} className={cat === c.id ? styles.chipOn : styles.chipBtn} onClick={() => setCat(c.id)}>
                {c.label} <i>{count('cat', c.id)}</i>
              </button>
            ))}
          </div>
          <div className={styles.chips}>
            {PRICES.map(p => (
              <button key={p.id} className={price === p.id ? styles.chipOn : styles.chipBtn} onClick={() => setPrice(p.id)}>
                {p.label} <i>{count('price', p.id)}</i>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>资源</div>
            <h2>全部资源</h2>
          </div>
          <span className={styles.sectionNote}>共 {shown.length} 项</span>
        </div>

        {items === null ? (
          <div className={styles.grid}>{[0, 1, 2, 3].map(i => <div key={i} className={`${styles.card} ${styles.skeleton}`} />)}</div>
        ) : error ? (
          <div className={styles.empty}>{error}<br /><button className={styles.btnGhost} onClick={load}>重试</button></div>
        ) : shown.length === 0 ? (
          <div className={styles.empty}>没有符合条件的资源</div>
        ) : (
          <div className={styles.grid}>
            {shown.map(item => <Card key={item.slug} item={item} {...actions} busy={busy === item.slug} />)}
          </div>
        )}

        {open && <Detail item={open} user={user} qqGroup={qqGroup} onClose={() => setOpen(null)} {...actions} busy={busy === open.slug} />}
        {toast && <div className={styles.toast}>{toast}</div>}
      </main>
    </Layout>
  );
}
