---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 6
title: 属性 BUFF
---

# 属性 BUFF

时装可以提供**永久持有型**属性加成：玩家只要拥有这件时装就会生效，**不需要穿在身上**。收藏越多，加成越多，这让时装真正融入 RPG 成长线。

:::info 需要 MythicLib
属性通过 MythicLib 注册。未安装 MythicLib 时时装照常可用，只是不套用属性。
:::

## 写法

```yaml
attributes:
  attack-damage: 15
  max-health: 20
  defense: 8
  movement-speed: 0.05
  critical-strike-chance: 2
```

不需要属性时写 `attributes: {}` 或直接省略。

## 计算规则

- 拥有即生效，不要求穿戴。
- 拥有多件时装时，各自的属性**叠加**。
- 收回时装（`/cosmetic remove`）后，对应属性立即移除。
- 登录、重生后自动重新套用。
- `ownership.op-has-all: true` 时，OP 会获得全部时装的属性。

## 属性名称

属性键会自动转换为 MythicLib 格式，例如 `attack-damage` → `ATTACK_DAMAGE`、`critical-strike-chance` → `CRITICAL_STRIKE_CHANCE`。
**凡是 MythicLib / MMOItems 已注册的属性都可以使用**，不限于下表。

| 键 | 默认显示名称 |
| --- | --- |
| `attack-damage` | 攻击伤害 |
| `max-health` | 最大生命 |
| `defense` | 防御力 |
| `movement-speed` | 移动速度 |
| `critical-strike-chance` | 暴击几率 |
| `critical-strike-power` | 暴击伤害 |
| `skill-damage` | 技能伤害 |
| `magic-damage` | 魔法伤害 |

`movement-speed` 是属性数值加成，不是百分比。属性最终效果取决于 MythicLib 与服务器的属性系统。

## 显示名称

在 `messages.yml` 修改或新增：

```yaml title="messages.yml"
stats:
  header: '&6[时装 BUFF]'
  line: '&7{stat}: &a+{value}'
  names:
    attack-damage: '攻击伤害'
    max-health: '最大生命'
    cooldown-reduction: '冷却缩减'
```

未翻译的属性仍然有效，说明中会直接显示原键名。
