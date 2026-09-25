---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 1
title: 菜单
description: 称号仓库、商店、管理界面与展示界面的配置。
---

# 菜单

四个菜单都在 `plugins/CloudTitle/menus/`，修改后 `/clt reload` 生效。菜单中的物品无法被拿取、Shift 移动、拖拽或丢出。

| 文件 | 菜单 |
| --- | --- |
| `wardrobe.yml` | `/clt open` 称号仓库 |
| `shop.yml` | `/clt shop` 称号商店 |
| `view.yml` | `/clt view <玩家>` 管理界面 |
| `showcase.yml` | `/clt showcase <玩家>` 展示界面（只读） |

## 通用设置

```yaml
title: '&8称号仓库 &7({page}/{pages})'   # {page} {pages} {player}
rows: 6                                  # 1 – 6 行
items-per-page: 45
content-slots: [0,1,2,3, …, 44]          # 放称号的格位（从 0 起算）
preview: small                           # 物品名中的称号预览：small 小图 / big 大图
```

称号按 `order` 排序后依次填入 `content-slots`，放不下自动分页。称号配置里写了 `menu-slot` / `menu-page` 的会固定在该位置；格位冲突时会改为自动排列并在控制台提示。

## 称号物品

```yaml title="menus/wardrobe.yml"
item:
  name: '{preview} &f{name}'
  lore-equipped: ['{lore}', '{stats}', '', '{expire}', '&a● 佩戴中', '&7点击卸下']
  lore-owned: ['{lore}', '{stats}', '', '{expire}', '&e点击佩戴']
  lore-locked: ['{lore}', '{stats}', '', '&c✖ 未拥有', '&7获取方式：{obtain}']
  expire-permanent: '&7永久拥有'
  expire-timed: '&7剩余 &e{time}'
  glow-equipped: true
show-locked: true          # 是否显示未拥有的称号（仅仓库）
```

| 变量 | 内容 |
| --- | --- |
| `{preview}` | 称号图（小图或大图的首帧） |
| `{name}` / `{id}` | 称号名称 / ID |
| `{lore}` | 称号的 lore（多行） |
| `{stats}` | 属性行（多行，按 `stats.yml` 格式；没有属性时整段隐藏） |
| `{expire}` | 剩余时间（`expire-permanent` / `expire-timed`） |
| `{obtain}` | 获取方式（称号的 `obtain:`，或「称号商店购买」；为空时**整行隐藏**） |
| `{source}` | 获得来源（管理界面常用），如 `admin:Steve`、`shop`、`card` |

## 商店物品

```yaml title="menus/shop.yml"
confirm-seconds: 5         # 第一次点击后，多少秒内再点才确认购买
show-owned: true           # 是否显示已永久拥有的称号
item:
  lore-buy: ['{lore}', '{stats}', '', '&7价格：', '{cost}', '&7时长：&e{duration}', '', '&e点击购买']
  lore-extend: [ … ]       # 已拥有限时版本（续费）
  lore-confirm: [ … ]      # 等待再次点击确认
  lore-owned: [ … ]        # 已永久拥有
  lore-no-permission: [ … ]
  cost-money: ' &8▪ &e{amount} &7金币'
  cost-points: ' &8▪ &b{amount} &7点券'
  cost-item: ' &8▪ &f{item} &7×{amount}'
  cost-free: ' &8▪ &a免费'
```

商店额外支持 `{cost}`（价格，多行）、`{duration}`（购买时长）、`{permission}`（购买所需权限）。

## 按钮

```yaml
buttons:
  previous: { enabled: true, slot: 45, material: ARROW, name: '&e上一页' }
  next:     { enabled: true, slot: 53, material: ARROW, name: '&e下一页' }
  unequip:  { enabled: true, slot: 49, material: BARRIER, name: '&c卸下当前称号' }
  close:    { enabled: false, slot: 48, material: OAK_DOOR, name: '&7关闭' }
  shop:                      # 自定义按钮：点击执行指令
    enabled: true
    slot: 47
    material: EMERALD
    name: '&a称号商店'
    command: 'clt shop'      # 以玩家身份执行，可用 {player}
```

内置按钮：`previous`、`next`、`unequip`、`close`；其他名称都是自定义按钮，需要写 `command`。
每个按钮都可以设置 `lore`、`custom-model-data` 与 `item-model`。按钮所在格位不会放称号。
