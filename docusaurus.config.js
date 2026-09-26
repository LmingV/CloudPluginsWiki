// @ts-check
// Docusaurus 配置文件，详见 https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CloudPlugins 官方 Wiki',
  tagline: 'CloudPlugins 云系列插件官方文档',
  favicon: 'img/cloudplugins-mark.svg',
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap',
  ],

  // 站点最终访问地址（自定义域名）
  url: 'https://Cloud.plugins.wiki',
  // 自定义域名下部署在根路径
  baseUrl: '/',

  // GitHub Pages 部署配置
  organizationName: 'LmingV', // GitHub 用户名/组织名
  projectName: 'CloudPluginsWiki', // 仓库名
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // 国际化：以简体中文为默认语言
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          // 每篇文档右上角“编辑此页”链接指向 GitHub
          editUrl:
            'https://github.com/LmingV/CloudPluginsWiki/tree/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/LmingV/CloudPluginsWiki/tree/main/',
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/theme.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      announcementBar: {
        id: 'release-2026-09-26',
        content: '✦ 云时装 <b>3.1.0</b> 原生背包上线 · 云称号 <b>1.0.0</b> 序列帧动态称号 · <a href="/docs/cosmetics/changelog">查看更新 →</a>',
        isCloseable: true,
      },
      docs: {
        sidebar: { hideable: true },
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      navbar: {
        title: 'CloudPlugins Wiki',
        logo: {
          alt: 'CloudPlugins Wiki Logo',
          src: 'img/cloudplugins-mark.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: '全部插件',
            position: 'left',
            className: 'cp-nav-plugins',
            items: [
              { type: 'html', value: '<span class="cp-nav-group">云系列插件</span>' },
              { to: '/docs/cosmetics', label: 'CloudCosmetics · 云时装' },
              { to: '/docs/title', label: 'CloudTitle · 云称号' },
              { to: '/docs/chat', label: 'CloudChat · 云聊天' },
              { type: 'html', value: '<span class="cp-nav-group">模型贩售</span>' },
              { to: '/docs/shop/cosmetics', label: '时装模型' },
              { to: '/docs/shop/skills', label: '技能模型' },
              { to: '/docs/shop/weapons', label: '武器模型' },
              { to: '/docs/shop/terms', label: '购买须知' },
            ],
          },
          {
            type: 'dropdown',
            label: '更新记录',
            position: 'left',
            items: [
              { to: '/docs/cosmetics/changelog', label: 'CloudCosmetics' },
              { to: '/docs/title/changelog', label: 'CloudTitle' },
            ],
          },
          {
            to: '/docs/intro',
            label: '快速开始',
            position: 'right',
          },
          {
            href: 'https://qm.qq.com/q/qjKEhFUF0I',
            label: '交流群',
            position: 'right',
          },
          {
            href: 'https://github.com/LmingV/CloudPlugins.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '快速开始',
                to: '/docs/intro',
              },
              {
                label: 'CloudCosmetics',
                to: '/docs/cosmetics',
              },
              {
                label: 'CloudChat',
                to: '/docs/chat',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '加入交流群',
                href: 'https://qm.qq.com/q/qjKEhFUF0I',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/LmingV/CloudPlugins.github.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CloudPlugins Wiki. 最终解释权归CloudPlugins团队所有`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
