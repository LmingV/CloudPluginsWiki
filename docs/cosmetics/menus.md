---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 10
title: 菜单与商城
---

# 菜单与商城

云时装有三个界面，全部位于 `menus/` 目录，标题、行数、格子、按钮都可以自定义。

```text
/cosmetic ──→ 分类选择 categories.yml ──→ 衣橱 wardrobe.yml
                       │
                       └── 商城按钮 ──→ 商城分类 ──→ 商城 shop.yml
```

:::tip 防刷物品保护
所有插件界面都会取消取物、Shift 移动、数字键交换、双击收集与拖曳，界面物品无法被拿走；玩家自己背包里的物品不受影响。
:::

## 分类选择 categories.yml

```yaml title="menus/categories.yml"
title: '&8选择时装等级'
rows: 3

categories:
  wings:                 # 必须与 cosmetics/ 内的文件名相同（不含 .yml）
    slot: 11
    material: PAPER
    custom-model-data: 0
    name: '&d史诗时装'
    lore: ['&7点击查看史诗时装']
  legendary:
    slot: 13
    material: PAPER
    name: '&6传说时装'
    lore: ['&7点击查看传说时装']

buttons:
  shop:                  # 打开商城
    enabled: true
    slot: 18
    material: EMERALD
    name: '&6时装商城'
    lore: ['&7点击购买并永久解锁时装']
  self-visibility:       # 显示 / 隐藏自己的时装
    enabled: true
    slot: 20
    material: ENDER_EYE
    name: '&b显示／隐藏自己的时装'
  back:                  # 返回服务器主菜单
    enabled: true
    slot: 22
    material: OAK_DOOR
    name: '&a返回主菜单'
    command: 'menu'      # 点击时以玩家身份执行，不要加 /
  others-visibility:     # 显示 / 隐藏其他玩家时装
    enabled: true
    slot: 24
    material: SPYGLASS
    name: '&b显示／隐藏其他玩家时装'
```

## 衣橱 wardrobe.yml

```yaml title="menus/wardrobe.yml"
title: '&8{category} &7({page}/{pages})'
rows: 6
items-per-page: 45
content-slots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44]

buttons:
  previous: { enabled: true, slot: 45, material: ARROW,    name: '&e上一页' }
  back:     { enabled: true, slot: 48, material: OAK_DOOR, name: '&a返回时装分类' }
  unequip:  { enabled: true, slot: 50, material: BARRIER,  name: '&c卸下目前时装' }
  next:     { enabled: true, slot: 53, material: ARROW,    name: '&e下一页' }
```

- 时装按 `slot` 数值从小到大、依次填入 `content-slots`；超过 `items-per-page` 自动分页。
- `items-per-page` 不能超过 `content-slots` 的格数；按钮位置请避开内容格。
- `{category}` `{page}` `{pages}` 会替换为分类名称、当前页、总页数。

## 商城 shop.yml

需要 Vault 与任一经济插件。只有 `shop.enabled: true` 的时装会上架，也只会显示含有可售时装的分类。

```yaml title="menus/shop.yml"
category-title: '&8时装商城 · 选择等级'
category-rows: 3
shop-title: '&8商城 · {category} &7({page}/{pages})'
shop-rows: 6
items-per-page: 45

item-lore:
  - ''
  - '&7价格：&e{price} 金币'
  - '{status}'
  - ''
  - '{stats}'

status:
  owned: '&a你已永久拥有这件时装'
  available: '&e左键点击购买'
  disabled: '&c目前无法购买'
```

时装上架：

```yaml
star_wings:
  # ...
  shop:
    enabled: true
    price: 1000
```

| 保护机制 | 说明 |
| --- | --- |
| 并发保护 | 上一笔购买处理完之前不会重复扣款 |
| 自动退款 | 扣款成功但写入失败时自动退还 |
| 已拥有检查 | 已拥有的时装无法重复购买 |
| 权限控制 | 需要 `cloudcosmetics.shop` |

## 消息 messages.yml

首次生成的所有消息均为简体中文。图腾相关提示见[不死图腾](./define/totem.mdx#提示文字)。

所有提示文字都在 `messages.yml`：

| 键 | 默认内容 |
| --- | --- |
| `equipped` | `&a已穿戴：{cosmetic}` |
| `unequipped` | `&e已卸下时装。` |
| `no_skin` | 你没有这件时装。 |
| `reload_success` | 时装、消息与主配置已重新加载并立即套用。 |
| `self_shown` / `self_hidden` | 显示 / 隐藏自己时装的提示 |
| `shop_success` | `&a已购买并永久解锁：{cosmetic} &7（花费 &e{price}&7）` |
| `shop_insufficient` | `&c金钱不足，需要 &e{price}&c。` |
| `shop_refunded` | 购买失败自动退款提示 |
| `stats.*` | BUFF 标题、行格式与属性显示名称 |
