---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 3
title: 属性加成
description: 称号属性（MythicLib / MMOItems）、stats.yml 显示名称与生效方式。
---

# 属性加成

称号可以附带属性加成，需要安装 **MythicLib**（MMOItems、MMOCore 的属性都由它管理）。

## 写法

```yaml title="titles/my.yml"
star:
  stats:
    ATTACK_DAMAGE: 5          # 攻击伤害 +5
    MAX_HEALTH: 10            # 最大生命 +10
    CRITICAL_STRIKE_CHANCE: 3 # 暴击率 +3%
    MOVEMENT_SPEED: '5%'      # 带 % = 百分比加成（移动速度 ×1.05）
```

- 键名是 MythicLib / MMOItems 的属性 ID（大写；`-` 与 `_` 都可以）。
- 数值可以是负数。写成 `'10%'`（带引号）表示百分比加成。

## 生效方式

```yaml title="config.yml"
stats:
  mode: equipped   # equipped = 只有佩戴中的称号生效
                   # owned    = 拥有的全部称号都生效（全局 buff，可叠加）
                   # none     = 关闭
```

属性会在以下时机自动更新：进入服务器、佩戴 / 卸下 / 切换称号、获得 / 收回称号、称号到期、`/clt reload`。
离开服务器时自动移除，不会残留在玩家身上。

## 显示名称（stats.yml）

`stats.yml` 决定属性在仓库、商店与称号卡上怎么显示：`ATTACK_DAMAGE: 5` → 「攻击伤害 +5」。

```yaml title="stats.yml"
header: '&6称号属性'          # 属性区块的标题，留空不显示
line: '&7{name} &a+{value}'   # 正数
line-negative: '&7{name} &c{value}'

names:
  ATTACK_DAMAGE: '攻击伤害'
  MAX_HEALTH: '最大生命'
  CRITICAL_STRIKE_CHANCE: '暴击率'

suffix:                        # 本身就是百分比的属性，在数值后加单位
  CRITICAL_STRIKE_CHANCE: '%'
```

- 默认已内置常用属性的中文名称（攻击、生命、护甲、暴击、闪避、冷却缩减、各类伤害与防御、生命偷取、额外经验……）。
- 没写在 `names:` 里的属性也能用，只是会直接显示属性 ID。
- 在菜单与称号卡的 lore 中用 `{stats}` 插入属性行；称号没有属性时这一段会自动隐藏。

:::note AttributePlus / SX-Attribute
目前支持 MythicLib（含 MMOItems、MMOCore）。AttributePlus、SX-Attribute 的接入计划在后续版本加入。
:::
