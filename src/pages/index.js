import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const ticker = [
    "ModelEngine 模型时装", "原生背包", "多件穿戴", "序列帧动态称号", "称号商店", "时装卡 · 称号卡",
    "永久属性 BUFF", "MySQL 跨服同步", "PlaceholderAPI", "ItemsAdder / CraftEngine / Nexo", "Paper · Purpur · Folia", "1.20 – 26.x",
];

function CosmeticsVisual() {
    return <img className={styles.visualImage} src="/img/cosmetics-banner.svg" alt="CloudCosmetics 云时装" loading="lazy" />;
}

function TitleVisual() {
    return (
        <div className={styles.titleStage} aria-hidden="true">
            <div className={styles.nameplate}>
                <span className={styles.titleBadge}>✦ 生死轮回 ✦</span>
                <span className={styles.playerName}>Steve</span>
            </div>
            <div className={styles.tabList}>
                <div><i className={styles.miniBadge} />Alex</div>
                <div><i className={`${styles.miniBadge} ${styles.miniGold}`} />Steve</div>
                <div><i className={`${styles.miniBadge} ${styles.miniCyan}`} />Notch</div>
            </div>
        </div>
    );
}

function ChatVisual() {
    return (
        <div className={styles.chatStage} aria-hidden="true">
            <div className={styles.chatLine}><b className={styles.chatTag}>全服</b><span className={styles.chatName}>Alex</span>今晚一起打 BOSS 吗？</div>
            <div className={styles.chatLine}><b className={`${styles.chatTag} ${styles.chatTrade}`}>交易</b><span className={styles.chatName}>Steve</span>收一把传说武器</div>
            <div className={styles.chatLine}><b className={`${styles.chatTag} ${styles.chatStaff}`}>公告</b><span className={styles.chatName}>服主</span>周末双倍经验开启 ✦</div>
        </div>
    );
}

const plugins = [
    {
        id: "cosmetics", name: "CloudCosmetics", cn: "云时装", status: "v3.1.0", price: "50R", to: "/docs/cosmetics",
        pitch: "把 bbmodel 做成玩家可以穿戴的时装：翅膀、背饰、贴身装甲、原生背包。",
        points: ["逐 tick 跟随，转身不拖影", "时装卡 · 商城 · 永久属性", "多件穿戴 · 原生背包"],
        Visual: CosmeticsVisual,
    },
    {
        id: "title", name: "CloudTitle", cn: "云称号", status: "v1.0.0", to: "/docs/title",
        pitch: "图片放进文件夹就会动的称号。资源包自动生成，一键合并进 ItemsAdder。",
        points: ["序列帧 / GIF 动态称号", "称号商店 · 称号卡 · 限时称号", "属性加成 · 跨服同步"],
        Visual: TitleVisual,
    },
    {
        id: "chat", name: "CloudChat", cn: "云聊天", status: "开发中", soon: true, to: "/docs/chat",
        pitch: "频道、格式与权限集中管理，与云称号深度联动。",
        points: ["多频道聊天", "称号前缀与悬停信息", "管理与审核工具"],
        Visual: ChatVisual,
    },
];

const reasons = [
    { k: "实机", t: "上线前实机验收", d: "真实客户端自动化测试加上回归测试，新版本上线前层层把关。" },
    { k: "轻量", t: "为大服优化", d: "异步数据库、预计算渲染、按距离降频，人多也不卡。" },
    { k: "中文", t: "完整中文文档", d: "从安装到深度配置，每一步都有可以照做的说明。" },
    { k: "更新", t: "持续更新维护", d: "跟进新版本 Minecraft 与常用插件，更新记录清楚可查。" },
];

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title="CloudPlugins · 云系列插件" description={siteConfig.tagline}>
            <main className={styles.page}>
                {/* ---------- hero ---------- */}
                <section className={styles.hero}>
                    <video className={styles.heroVideo} autoPlay loop muted playsInline preload="metadata" poster="/video/cosmetics-showcase-poster.webp">
                        <source src="/video/cosmetics-showcase.webm" type="video/webm" />
                        <source src="/video/cosmetics-showcase.mp4" type="video/mp4" />
                    </video>
                    <div className={styles.heroShade} />
                    <div className={styles.heroInner}>
                        <span className={styles.kicker}>CLOUDPLUGINS · MINECRAFT PLUGIN STUDIO</span>
                        <h1 className={styles.heroTitle}>让你的服务器<br /><span>一眼与众不同</span></h1>
                        <p className={styles.heroLead}>云系列插件与原创模型：时装、称号、聊天，一套完整的玩家外观与身份体验。</p>
                        <div className={styles.heroActions}>
                            <a className={styles.btnPrimary} href="#plugins">浏览插件</a>
                            <Link className={styles.btnGhost} to="/docs/shop">模型商店</Link>
                        </div>
                        <div className={styles.heroBadges}>
                            <span>Paper · Purpur · Folia</span><span>1.20 – 26.x</span><span>中文文档</span><span>持续更新</span>
                        </div>
                    </div>
                    <span className={styles.heroCaption}>● 实机画面 · CloudCosmetics</span>
                </section>

                {/* ---------- ticker ---------- */}
                <div className={styles.ticker} aria-hidden="true">
                    <div className={styles.tickerTrack}>
                        {[...ticker, ...ticker].map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
                    </div>
                </div>

                {/* ---------- plugins ---------- */}
                <section className={styles.section} id="plugins">
                    <div className={styles.sectionHead}>
                        <span className={styles.kicker}>CLOUD SERIES</span>
                        <h2>云系列插件</h2>
                        <p>每一款都能单独使用，搭配起来更完整。</p>
                    </div>
                    <div className={styles.pluginGrid}>
                        {plugins.map(({ id, name, cn, status, price, soon, to, pitch, points, Visual }) => (
                            <Link key={id} to={to} className={`${styles.pluginCard} ${styles[id]}`}>
                                <div className={styles.pluginVisual}><Visual /></div>
                                <div className={styles.pluginBody}>
                                    <div className={styles.pluginTags}>
                                        <span className={soon ? styles.tagSoon : styles.tagVersion}>{status}</span>
                                        {price && <span className={styles.tagPrice}>{price}</span>}
                                    </div>
                                    <h3>{name}<small>{cn}</small></h3>
                                    <p>{pitch}</p>
                                    <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
                                    <span className={styles.pluginLink}>{soon ? "了解更多" : "查看文档"} →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ---------- model shop ---------- */}
                <section className={`${styles.section} ${styles.shopSection}`}>
                    <div className={styles.shopGrid}>
                        <div className={styles.shopMedia}>
                            <video autoPlay loop muted playsInline preload="metadata" poster="/video/shop/samsara-scroll-poster.webp">
                                <source src="/video/shop/samsara-scroll.mp4" type="video/mp4" />
                            </video>
                            <span className={styles.mediaTag}>● 实机画面 · 轮回生死轴</span>
                        </div>
                        <div className={styles.shopCopy}>
                            <span className={styles.kicker}>MODEL SHOP</span>
                            <h2>原创模型商店</h2>
                            <p>为云时装量身打造的原创 ModelEngine 模型，多段形态与完整动画，适合做成进阶与收藏系统。</p>
                            <div className={styles.shopCats}>
                                <Link to="/docs/shop/cosmetics">时装</Link>
                                <Link to="/docs/shop/skills">技能</Link>
                                <Link to="/docs/shop/weapons">武器</Link>
                            </div>
                            <Link to="/docs/shop/cosmetics/samsara-scroll" className={styles.featured}>
                                <img src="/img/shop/samsara-icon-preview.webp" alt="" loading="lazy" />
                                <div><small>本期精选</small><strong>轮回生死轴</strong><span>四段形态 · 附赠动态称号</span></div>
                                <b>60R</b>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ---------- why ---------- */}
                <section className={styles.section}>
                    <div className={styles.sectionHead}>
                        <span className={styles.kicker}>WHY CLOUDPLUGINS</span>
                        <h2>认真做好每一个细节</h2>
                    </div>
                    <div className={styles.reasonGrid}>
                        {reasons.map((r) => (
                            <div key={r.k} className={styles.reason}>
                                <span className={styles.reasonKey}>{r.k}</span>
                                <h3>{r.t}</h3>
                                <p>{r.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------- community ---------- */}
                <section className={styles.cta}>
                    <div className={styles.ctaInner}>
                        <div>
                            <span className={styles.kicker}>COMMUNITY</span>
                            <h2>购买咨询、技术支持、新品预告</h2>
                            <p>加入官方交流群，第一时间获得更新与优惠。</p>
                        </div>
                        <div className={styles.ctaActions}>
                            <Link className={styles.btnPrimary} href="https://qm.qq.com/q/qjKEhFUF0I">加入 QQ 交流群</Link>
                            <Link className={styles.btnGhost} to="/docs/intro">快速开始</Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
