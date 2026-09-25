// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  mainSidebar: [
    'intro',
  ],
  cosmeticsSidebar: [
    {
      type: 'category', label: '基础', collapsible: false,
      items: [
        'cosmetics/index',
        'cosmetics/quick-start',
        'cosmetics/install',
        'cosmetics/commands',
        'cosmetics/permissions',
        'cosmetics/faq',
        'cosmetics/changelog',
      ],
    },
    {
      type: 'category', label: '时装配置', collapsible: false,
      items: [
        'cosmetics/define/fields',
        'cosmetics/define/render-modes',
        'cosmetics/define/rotation-follow',
        'cosmetics/define/animations',
        'cosmetics/define/lore-card',
        'cosmetics/define/attributes',
        'cosmetics/define/totem',
        'cosmetics/define/integrations',
      ],
    },
    {
      type: 'category', label: '系统设置', collapsible: false,
      items: [
        'cosmetics/menus',
        'cosmetics/config',
        'cosmetics/database',
        'cosmetics/placeholders',
        'cosmetics/performance',
      ],
    },
  ],
  shopSidebar: [
    {
      type: 'category', label: '商店', collapsible: false,
      items: ['shop/index', 'shop/terms'],
    },
    {
      type: 'category', label: '时装', collapsible: false,
      link: { type: 'doc', id: 'shop/cosmetics/index' },
      items: ['shop/cosmetics/samsara-scroll'],
    },
    {
      type: 'category', label: '技能', collapsible: false,
      link: { type: 'doc', id: 'shop/skills' },
      items: [],
    },
    {
      type: 'category', label: '武器', collapsible: false,
      link: { type: 'doc', id: 'shop/weapons' },
      items: [],
    },
  ],
  chatSidebar: ['chat/index'],
};

export default sidebars;
