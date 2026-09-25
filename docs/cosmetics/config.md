---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 11
title: 主配置 config.yml
---

# 主配置 config.yml

`config.yml` 只放全局设置，每件时装请写在 `cosmetics/` 中。修改后执行 `/cosmetic reload` 立即生效。

## 完整默认配置

```yaml title="config.yml"
menu:
  title: '&8云时装衣橱'
  rows: 6

render-distance: 64

equipment:
  mode: single
  slot-conflict: replace
  max-equipped: 5

follow-watchdog:
  enabled: true
  check-interval-ticks: 5
  failures-before-rebuild: 3
  rebuild-cooldown-seconds: 5

animation:
  distance-optimization: false

player-rendering:
  animation-lod: true
  viewer-budget:
    enabled: true
    max-models: 4
    refresh-ticks: 4

visibility:
  others: true

ownership:
  op-has-all: true

card:
  item: PAPER
  custom-model-data: 0
  item-model: ''
  name: '&6{cosmetic_name} 时装卡'
  lore:
    - '&e使用后可永久获得该时装'
    - ''
    - '{stats}'

totem-notify:
  mode: actionbar
  only-when-wearing: true
  update-ticks: 20
  notify-triggered: true
  notify-ready: true
  bossbar:
    color: RED
    style: SOLID

rotation:
  mode: rigid
  body-smoothing: 0.55
  head-smoothing: 0.75
  adaptive:
    dead-zone: 0.35
    small-angle-speed: 0.42
    medium-angle-speed: 0.68
    large-angle-speed: 0.88
    medium-angle: 10.0
    large-angle: 40.0
    snap-angle: 120.0

database:
  type: sqlite
  file: data.db
  host: 127.0.0.1
  port: 3306
  database: minecraft
  username: root
  password: ''
  table: yunyue_cosmetic_players
  parameters: 'useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8'
```

## 字段参考

| 键 | 默认 | 说明 |
| --- | --- | --- |
| `equipment.mode` | `single` | `single` 全身一件；`per-category` 每个分类分别穿戴，见[多件穿戴](./loadout.md) |
| `equipment.slot-conflict` | `replace` | 原生装备槽冲突：`replace` 替换旧时装 / `deny` 拒绝新时装 |
| `equipment.max-equipped` | `5` | `per-category` 模式下的全身总上限，达到后拒绝新增 |
| `render-distance` | `64` | 其他玩家距离穿戴者超过此格数就看不到时装（最小 8，建议 32 – 96） |
| `follow-watchdog.*` | 见上 | 骨骼冻结检测，见[转向与跟随](./define/rotation-follow.md#三重自我修复) |
| `animation.distance-optimization` | `false` | `true` 时交给 ModelEngine 远距离降频 |
| `player-rendering.animation-lod` | `true` | 远距离玩家模型降低动画运算 |
| `player-rendering.viewer-budget.enabled` | `true` | 启用每位观众的模型数量上限 |
| `player-rendering.viewer-budget.max-models` | `4` | 每位玩家最多加载离自己最近的 N 件他人 `meg` 时装（自己的不受限） |
| `player-rendering.viewer-budget.refresh-ticks` | `4` | 每几 tick 按距离重新排序（最小 2） |
| `visibility.others` | `true` | 默认是否能看到其他玩家的时装 |
| `ownership.op-has-all` | `true` | OP 视为拥有全部时装（含 BUFF） |
| `card.*` | 见上 | 默认时装卡外观，见 [Lore 与时装卡](./define/lore-card.md) |
| `totem-notify.*` | 见上 | 不死图腾冷却提示：`actionbar` / `bossbar` / `none`，见[不死图腾](./define/totem.mdx#冷却提示) |
| `rotation.*` | 见上 | 转向模式，见[转向与跟随](./define/rotation-follow.md) |
| `database.*` | 见上 | 见[数据库与跨服](./database.md) |

性能相关参数的推荐值见[性能与优化](./performance.md)。
