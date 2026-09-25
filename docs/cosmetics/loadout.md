---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 10.8
title: 多件穿戴
description: 2.10.8 起可让玩家同时穿戴多件时装：按分类限制数量、全身总上限、装备槽冲突与互斥群组。
---

# 多件穿戴

2.10.8 起，玩家可以同时穿戴多件时装，例如 **翅膀 + 头饰 + 光环**。规则由服主决定：全身一件，或按分类分别穿戴。

:::info 默认不开启
默认 `mode: single`（一次一件），与旧版行为完全相同。旧服升级到 2.10.8 **不会**突然变成多件模式，也不需要删除 config 或数据库。
:::

## 开启多件穿戴

在 `config.yml` 中：

```yaml title="config.yml"
equipment:
  mode: per-category     # single = 全身一件；per-category = 每个分类分别穿戴
  slot-conflict: replace # 原生装备槽冲突：replace 替换旧时装 / deny 拒绝新时装
  max-equipped: 5        # 全身总上限（仅 per-category 模式）
```

改完执行 `/cosmetic reload` 即可生效。

| 键 | 默认 | 说明 |
| --- | --- | --- |
| `equipment.mode` | `single` | `single`：全身只能穿一件；`per-category`：每个分类分别计算数量 |
| `equipment.slot-conflict` | `replace` | 两件 `type: equipment` 时装占用同一个原生装备槽时：`replace` 卸下旧的换上新的，`deny` 拒绝穿戴新的 |
| `equipment.max-equipped` | `5` | 全身最多同时穿几件。达到上限时**拒绝新增**，原本的穿搭保持不变 |

## 什么是「分类」

分类就是 `cosmetics/` 里的 **YAML 文件名**，和渲染模式无关：

```text
cosmetics/
├── wings.yml      → 分类 wings
├── hats.yml       → 分类 hats
└── auras.yml      → 分类 auras
```

`meg`、`body`、`equipment`、`display` 只是**渲染方式**，不再作为「同类型只能一件」的限制。所以 BODY + MEG + HEAD 可以一起穿，多件 MEG 也可以同穿；同一个模型也能由不同时装配置分别挂载。

## 每个分类穿几件

在 `menus/categories.yml` 的每个分类下加 `max-equipped`，**原有的菜单字段请保留**：

```yaml title="menus/categories.yml"
categories:
  hats:
    max-equipped: 1
    slot: 11
    material: PAPER
    name: '&e头饰'
  backpacks:
    max-equipped: 1
    slot: 13
    material: PAPER
    name: '&b背饰'
  auras:
    max-equipped: 2      # 光环可以同时穿两件
    slot: 15
    material: PAPER
    name: '&d光环'
```

| 值 | 效果 |
| --- | --- |
| 不填 | 默认 `1` |
| `1`、`2`、`3`… | 该分类最多同时穿戴的件数。满额时再穿，会**替换该分类最早穿戴的一件** |
| `0` | 禁止穿戴该分类 |

:::note
分类的 `max-equipped` 只控制「穿几件」；时装里的 `slot` / `order` 仍然是菜单排序字段，和穿戴数量无关。
:::

## 装备槽冲突

只有 `type: equipment` 的时装会占用原生装备槽（`HEAD`、`OFF_HAND` 等），也只有它们会做槽位冲突检查：

- 两件 `equipment` 时装都用 `HEAD` → 按 `slot-conflict` 处理（替换或拒绝）。
- `body` 时装的 `anchor: HEAD` **不占**原生 HEAD 槽，可以和 HEAD 装备外观同穿。
- 插件**不会**自动检测模型之间的穿模，模型位置请自行用 `offset` 调整。

## 互斥群组 equip-group

有些时装不适合和其他分类同穿，例如一整套龙甲模型会和翅膀、背饰重叠。给它们设置同一个 `equip-group`，同组只会保留**最新穿戴**的一件，即使它们来自不同分类：

```yaml title="cosmetics/suits.yml"
dragon_suit:
  type: meg
  model: dragon_suit
  equip-group: full-body   # 与 type 同层
```

```yaml title="cosmetics/wings.yml"
star_wings:
  type: meg
  model: star_wings
  equip-group: full-body   # 穿上龙甲会自动卸下翅膀，反之亦然
```

## 玩家操作

- 在衣橱点击**已穿戴**的时装：只卸下这一件。
- 点击衣橱的「卸下」按钮：卸下全部时装。
- 多件穿搭按穿戴顺序保存，重登、重启后自动恢复；旧版单件数据会自动沿用。
- 数据还在加载或加载失败时，穿戴变更会被阻止，避免覆盖尚未读取成功的数据。

## 其他规则

| 情况 | 行为 |
| --- | --- |
| 从 `per-category` 切回 `single` | 保留最后穿戴的一件 |
| 属性 BUFF | 仍按**已拥有**的时装计算，同时穿多件不会重复加成，见[属性 BUFF](./define/attributes.md) |
| 多件不死图腾 | 共用同一个玩家冷却，采用最早穿戴的图腾时装规则；切换时装不会重置冷却，见[不死图腾](./define/totem.mdx) |
| PAPI `%cloudcosmetics_equipped%` | 返回最后穿戴的一件，见[变量](./placeholders.md) |
