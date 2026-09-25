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
        id: 'cc-2-10-2',
        content: '✦ 云时装 <b>2.10.2</b> 已发布：时装菜单固定格位与排序 · 修复较大 offset 被误判重建 · <a href="/docs/cosmetics/changelog">查看更新记录 →</a>',
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
            type: 'docSidebar',
            sidebarId: 'cosmeticsSidebar',
            position: 'left',
            label: 'CloudCosmetics',
          },
          {
            type: 'docSidebar',
            sidebarId: 'chatSidebar',
            position: 'left',
            label: 'CloudChat',
          },
          {
            type: 'docSidebar',
            sidebarId: 'shopSidebar',
            position: 'left',
            label: '🛒 模型商店',
          },
          {
            to: '/docs/cosmetics/changelog',
            label: '更新记录',
            position: 'right',
          },
          {
            to: '/docs/intro',
            label: '快速开始',
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
