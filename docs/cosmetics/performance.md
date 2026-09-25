---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 13
title: 性能与优化
---

# 性能与优化

模型时装最大的负担来自**客户端**：同一画面需要渲染的骨骼与实体越多，FPS 越低。云时装在服务端做了多层控制，让主城满人时依然流畅。

## 内置优化

| 优化 | 作用 |
| --- | --- |
| 真实追踪判定 | 只把时装发送给真正追踪到穿戴者的玩家，而不是单纯按距离广播 |
| 渲染距离 | 超过 `render-distance` 的玩家不会收到时装数据 |
| 观众模型预算 | 每位玩家只加载离自己最近的 N 件他人 `meg` 时装，人再多也不会无限叠加 |
| 动画 LOD | 远处玩家的模型降低动画运算频率，近处保持完整 |
| 可见性更新降频 | 观众列表每 4 tick 刷新一次，并缓存位置与距离，避免重复计算 |
| 按需补发挂载 | 只在需要时补送掛载数据，不会整模型反复重建 |
| 异步数据库 | 所有读写异步执行，不阻塞主线程 |
| 玩家自主开关 | 低配玩家可 `/cosmetic others hide` 隐藏他人时装 |

## 推荐参数

| 场景 | `render-distance` | `viewer-budget.max-models` | `animation-lod` | `distance-optimization` |
| --- | :---: | :---: | :---: | :---: |
| 小型生存服（同屏 < 20 人） | 64 | 6 | `true` | `false` |
| 中型 RPG 服 | 48 | 4 | `true` | `false` |
| 大型主城 / 活动场景 | 32 | 2 – 3 | `true` | `true` |
| 展示服 / 截图拍摄 | 96 | 8 | `false` | `false` |

```yaml title="config.yml · 大型主城推荐"
render-distance: 32
animation:
  distance-optimization: true
player-rendering:
  animation-lod: true
  viewer-budget:
    enabled: true
    max-models: 3
    refresh-ticks: 4
```

## 模型制作建议

性能与模型本身关系最大，一个 cube 不等于一个实体，实际负担取决于 ModelEngine 的骨骼数量、渲染方式与动画复杂度。

- 减少不必要的骨骼：不参与动画的部件合并到同一骨骼。
- 避免大量半透明面互相重叠。
- 同一件时装不需要的动画不要保留。
- 大型模型搭配较小的 `render-distance`。

## FPS 与 TPS

| 指标 | 反映 | 下降时检查 |
| --- | --- | --- |
| FPS | 客户端渲染 | 同屏时装数量、模型骨骼与透明面 |
| TPS / MSPT | 服务端运算 | 使用 spark 等工具确认耗时来源 |

:::note
没有任何插件能保证任意复杂度的模型都零负担。以上机制的目标是让负担**可控、可调**。
:::
