import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const products = [
    {
        eyebrow: "PLAYER EXPERIENCE",
        title: "CloudCosmetics",
        description: "把外观、称号与个性化展示交给一套清晰、可扩展的云端系统。",
        accent: "violet",
        icon: "✦",
        to: "/docs/cosmetics"
    },
    {
        eyebrow: "COMMUNICATION",
        title: "CloudChat",
        description: "跨频道聊天、格式化消息与权限控制，构建更有秩序的服务器交流体验。",
        accent: "cyan",
        icon: "⌁",
        to: "/docs/chat"
    }
];

const quickLinks = [
    { label: "安装与升级", description: "从零开始部署插件", to: "/docs/intro", icon: "01" },
    { label: "CloudCosmetics", description: "外观系统文档", to: "/docs/cosmetics", icon: "02" },
    { label: "CloudChat", description: "聊天系统文档", to: "/docs/chat", icon: "03" }
];

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title="CloudPlugins 官方 Wiki" description={siteConfig.tagline}>
            <main className={styles.page}>
                <section className={styles.heroWrapper}>
                    <div className={styles.heroGlow} />
                    <div className={styles.hero}>
                        <div className={styles.heroCopy}>
                            <span className={styles.eyebrow}>CLOUDPLUGINS / OFFICIAL DOCS</span>
                            <h1>让服务器体验<br /><span>更轻、更稳、更有质感。</span></h1>
                            <p>CloudPlugins 云系列插件官方文档。这里汇总安装指南、配置说明与版本变更，帮助你快速把每一项能力用到位。</p>
                            <div className={styles.heroActions}>
                                <Link className={styles.primaryButton} to="/docs/intro">开始使用 <span>↗</span></Link>
                                <Link className={styles.textButton} to="/docs/cosmetics">浏览插件 <span>→</span></Link>
                            </div>
                            <div className={styles.heroMeta}>
                                <span><i className={styles.statusDot} /> 文档持续维护</span>
                                <span>面向服主与开发者</span>
                            </div>
                        </div>
                        <div className={styles.heroVisual} aria-label="CloudPlugins 产品预览">
                            <div className={styles.visualOrb} />
                            <div className={styles.visualWindow}>
                                <div className={styles.windowBar}><span /><span /><span /><b>cloudplugins</b></div>
                                <div className={styles.windowBody}>
                                    <div className={styles.windowKicker}>PLUGIN ECOSYSTEM</div>
                                    <strong>Cloud<span>Plugins</span></strong>
                                    <p>模块化 · 可配置 · 持续更新</p>
                                    <div className={styles.signalRow}><span>SYNC STATUS</span><b>ONLINE</b></div>
                                    <div className={styles.signalLine}><i /><i /><i /><i /><i /></div>
                                </div>
                            </div>
                            <div className={styles.floatingTag}>✦ 官方维护</div>
                        </div>
                    </div>
                </section>

                <section className={styles.introSection}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.eyebrow}>THE CLOUD ECOSYSTEM</span>
                        <h2>一套文档，掌握整条插件产品线</h2>
                        <p>从第一次安装到深度配置，CloudPlugins Wiki 将每个关键步骤整理成可执行的说明。</p>
                    </div>
                    <div className={styles.productGrid}>
                        {products.map((product) => (
                            <Link key={product.title} to={product.to} className={`${styles.productCard} ${styles[product.accent]}`}>
                                <div className={styles.productTopline}><span>{product.eyebrow}</span><b>{product.icon}</b></div>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <span className={styles.cardAction}>查看文档 <span>↗</span></span>
                            </Link>
                        ))}
                        <div className={styles.productNote}>
                            <span className={styles.noteIcon}>+</span>
                            <div><strong>更多 Cloud 系列</strong><p>新插件与扩展能力将持续接入 Wiki。</p></div>
                        </div>
                    </div>
                </section>

                <section className={styles.quickSection}>
                    <div className={styles.quickHeader}><span className={styles.eyebrow}>START HERE</span><h2>选择你的下一步</h2></div>
                    <div className={styles.quickGrid}>
                        {quickLinks.map((item) => (
                            <Link key={item.label} to={item.to} className={styles.quickCard}>
                                <span className={styles.quickNumber}>{item.icon}</span>
                                <span><strong>{item.label}</strong><small>{item.description}</small></span>
                                <span className={styles.quickArrow}>↗</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className={styles.community}>
                    <div className={styles.communitySurface}>
                        <div><span className={styles.eyebrow}>BUILT IN THE OPEN</span><h2>遇到问题？一起把文档变得更好。</h2></div>
                        <div className={styles.communityRight}><p>欢迎在 GitHub 提交 Issue、建议或配置案例，也可以加入交流群获取社区支持。</p><div className={styles.communityCtas}><Link className={styles.primaryButton} href="https://github.com/LmingV/CloudPlugins.github.io">访问 GitHub <span>↗</span></Link><Link className={styles.secondaryButton} href="https://qm.qq.com/q/qjKEhFUF0I">加入交流群</Link></div></div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
