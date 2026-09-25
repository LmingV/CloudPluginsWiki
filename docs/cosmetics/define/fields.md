---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 1
title: 时装文件与通用字段
---

# 时装文件与通用字段

## 文件结构

`cosmetics/` 目录下的**每个 `.yml` 文件就是一个时装分类（等级）**，文件名即分类 ID：

```text
cosmetics/
├── wings.yml       → 分类 wings
├── legendary.yml   → 分类 legendary
└── eternal.yml     → 分类 eternal
```

文件内每个最外层键是一件时装。分类要出现在衣橱里，还需在 [`menus/categories.yml`](../menus.md) 中登记同名分类。

:::caution 时装 ID 全局唯一
时装卡、数据库、指令都使用时装 ID。即使在不同文件中，**ID 也不能重复**，也不要在上线后修改已发放的 ID。
:::

## 完整字段一览

```yaml
star_wings:                       # 时装 ID
  type: meg                       # 渲染模式：meg / display / equipment / body
  name: '<gradient:#FFE153:#66CCFF>星辰之翼</gradient>'
  model: star_wings               # 仅 meg：ModelEngine 模型 ID
  permission: cloudcosmetics.cosmetic.star_wings   # 可选，用于说明显示
  lore:                           # 可选，衣橱 / 商城说明
    - '&7由星光凝成的双翼。'
    - '{default_lore}'
  icon:                           # 衣橱 / 商城中的图标
    material: FEATHER
    custom-model-data: 0
    item-model: ''
  order: 10                       # 排序，越小越前（旧版写法 slot 仍可用）
  menu-slot: 8                    # 可选：固定格位（从 0 起算）
  menu-page: 1                    # 可选：配合 menu-slot 指定页码（从 1 起算）
  scale: 1.0                      # 模型倍率
  follow-rotation: true           # 是否跟随玩家朝向
  offset: { x: 0.0, y: 0.0, z: 0.25 }
  animation: idle                 # 单一动画；或使用 animations 按状态切换
  attributes:                     # 拥有即生效的属性 BUFF
    max-health: 10
  totem: false                    # 不死图腾（可选）
  shop: { enabled: true, price: 1000 }
  card: { ... }                   # 可选，覆盖默认时装卡外观
```

| 字段 | 说明 | 适用模式 |
| --- | --- | --- |
| `type` | 渲染模式，见[四种渲染模式](./render-modes.mdx)。不填时：有 `model` 视为 `meg`，否则视为 `display` | 全部 |
| `name` | 显示名称，支持 `&` 色码与 MiniMessage | 全部 |
| `model` | ModelEngine 模型 ID | `meg` |
| `permission` | 默认 `cloudcosmetics.cosmetic.<ID>`，供 `{permission}` 显示 | 全部 |
| `lore` | 衣橱与商城说明，见 [Lore 与时装卡](./lore-card.md) | 全部 |
| `icon` | 菜单图标，**与身上显示的模型无关** | 全部 |
| `order` | 在衣橱 / 商城中的排序，数值越小越前面；相同时按 ID 排序。旧写法 `slot` 仍可用 | 全部 |
| `menu-slot` | 固定放在指定格位（从 0 起算），见[菜单与商城](../menus.md#固定格位) | 全部 |
| `menu-page` | 配合 `menu-slot` 指定页码（从 1 起算），默认 1 | 全部 |
| `scale` | 模型倍率，最小 0.01 | `meg` `display` `body` |
| `follow-rotation` | 跟随玩家转向，见[转向与跟随](./rotation-follow.md) | `meg` `display` `body` |
| `offset` | 位置偏移，按玩家朝向计算 | `meg` `display` `body` |
| `animation` / `animations` | 动画，见[动画](./animations.md) | `meg` |
| `attributes` | 属性 BUFF，见[属性 BUFF](./attributes.md) | 全部 |
| `totem` 等 | 不死图腾，见[不死图腾](./totem.mdx) | 全部 |
| `shop` | 商城上架与价格，见[菜单与商城](../menus.md) | 全部 |
| `card` | 时装卡外观，见 [Lore 与时装卡](./lore-card.md) | 全部 |

## 图标 icon

```yaml
icon:
  material: PAPER
  custom-model-data: 10017   # 旧式模型编号，0 = 不使用
  item-model: ''             # 1.21.4+ item model，如 'namespace:item'
```

使用 CraftEngine 物品作图标：

```yaml
icon:
  source: craftengine
  item: 'your_namespace:your_item'
  material: PAPER            # CraftEngine 不可用时的备用图标
```

## 文字格式

| 写法 | 示例 |
| --- | --- |
| 传统色码 | `'&6黄金之翼'` |
| MiniMessage 渐变 | `'<gradient:#FFFFCE:#FFE153>圣光之杖</gradient>'` |

两种格式都能用，但同一段文字中请确保 MiniMessage 标签正确闭合。

## 安全修改流程

1. 修改前复制一份目标 YML。
2. 只用**空格**缩进，不要使用 Tab。
3. 先在测试服执行 `/cosmetic reload`，查看控制台有无 `Skipped cosmetic` 或 YAML 错误。
4. 检查第一 / 第三人称、他人视角、传送与重生后再上线。
