---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 4
title: 动画
---

# 动画

`meg` 时装可以播放 ModelEngine 模型中的动画，并**根据玩家当前状态自动切换**。

## 单一动画

```yaml
animation: idle
```

始终播放同一个动画，适合只有待机动画的模型。

## 按状态切换

```yaml
animations:
  idle: idle
  walk: walk
  sneak: sneak
  fly: fly
  swim: swim
```

| 状态 | 判定条件（优先级由上到下） |
| --- | --- |
| `fly` | 鞘翅滑翔中，或创造 / 飞行模式飞行中 |
| `swim` | 游泳中 |
| `sneak` | 潜行中 |
| `walk` | 水平方向正在移动 |
| `idle` | 以上皆否 |

- 名称填写**模型内的动画名称**（Blockbench 中的动画名）。
- 没有写的状态会回退到 `idle`；同时写了 `animation` 与 `animations.idle` 时以 `animations.idle` 为准。
- 切换时有 0.15 秒淡入淡出，状态变化不会生硬跳帧。

:::caution 循环要在模型里设置
动画是否循环由模型文件中的 loop 设置决定。一次性动画（例如召唤动画）播放完就会停住，只改名称不会让它变成循环动画。
:::

## 远距离动画

| 设置 | 作用 |
| --- | --- |
| `player-rendering.animation-lod` | 远处玩家的模型降低动画运算频率，近处保持完整 |
| `animation.distance-optimization` | 交给 ModelEngine 远距离降频；为 `true` 时远处动画可能看起来停住 |

详见[性能与优化](../performance.md)。
