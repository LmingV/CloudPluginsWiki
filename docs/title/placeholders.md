---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 3
title: 变量
description: 云称号的 PlaceholderAPI 变量，以及头顶、TAB、记分板、聊天分别该用哪个。
---

# 变量

云称号通过 **PlaceholderAPI** 提供变量，前缀为 `clt`。插件本身不渲染头顶文字 —— 把变量填进你已有的头顶 / TAB / 记分板 / 聊天插件即可。

## 变量列表

| 变量 | 内容 |
| --- | --- |
| `%clt_use%` | 正在佩戴的称号，**大图**，会动 |
| `%clt_use_small%` | 正在佩戴的称号，**小图版**，会动（给 TAB、记分板等空间小的位置） |
| `%clt_use_static%` | 大图，只显示首帧（不会动） |
| `%clt_use_small_static%` | 小图，只显示首帧（不会动） |
| `%clt_use_name%` | 称号名称（带颜色的文字） |
| `%clt_use_id%` | 称号 ID |
| `%clt_use_hover%` | 称号悬停文本（多行，给支持悬停的聊天插件，格式见 `config.yml` 的 `chat.hover`） |
| `%clt_has_<称号ID>%` | 是否拥有该称号：`true` / `false` |
| `%clt_count%` | 拥有的称号数量 |
| `%clt_expire_<称号ID>%` | 该称号的剩余时间（如 `6天23小时`）；永久显示 `永久`；未拥有为空 |

没有佩戴称号时，`use` 系列变量返回空白；在 `config.yml` 设置了 `default-title` 时显示该默认称号。

:::info %clt_use_small% 是小图版
`%clt_use_small%` 与 `%clt_use%` 是**同一个称号**的两种尺寸：大图给头顶、名称等显眼的位置，小图给 TAB 列表、记分板这类一行只有 8 像素高的地方。小图可以另外画一套，也可以自动从大图缩小，见[小图](./frames.md#小图)。
:::

## 不同位置该用哪个

| 显示位置 | 推荐变量 | 说明 |
| --- | --- | --- |
| 头顶 / 名称 | `%clt_use%` | 会动，大图 |
| TAB 列表 | `%clt_use_small%` 或 `%clt_use_small_static%` | 空间小用小图；不想闪动就用 static |
| 记分板 | `%clt_use_small%` 或 `%clt_use_small_static%` | 同上 |
| 聊天 | `%clt_use_static%` / `%clt_use_small_static%` | **只能静态**，原因见下方 |
| 悬停文本 | `%clt_use_hover%` | 聊天插件支持悬停时使用 |

:::warning 聊天室只能显示静态称号
聊天消息发出后就不会再更新，所以聊天里的称号**无法播放动画**。即使填了 `%clt_use%`，也只会停在发送那一刻的某一帧。
聊天请使用 `%clt_use_static%`（或小图 `%clt_use_small_static%`），显示固定的首帧，效果最稳定。
:::

## 动画与刷新

动态称号的每一帧都是资源包里的一个字符。变量会根据**当前时间**返回对应的那一帧，所以：

- **称号会不会动、动得多顺，取决于显示它的插件多久刷新一次。** 例如 TAB 插件每 100 毫秒刷新，8 fps 的称号就能完整播放；刷新间隔 1 秒，就只能看到每秒跳一帧。
- 刷新间隔比帧间隔长时，看到的是「跳帧」而不是变慢 —— 所有玩家看到的都是同一时刻的同一帧，保持同步。
- 建议显示插件的刷新间隔 ≤ `1000 / fps` 毫秒（8 fps → 125 毫秒）。
- **避免刷新间隔等于一轮动画长度的整数倍**：例如一轮刚好 1 秒的称号配上每 1 秒刷新，每次都会取到同一帧，动画会静止不动。

| 显示插件的刷新间隔 | 10 fps、10 帧的称号 |
| --- | --- |
| 1 秒（20 tick） | 完全不动 |
| 0.25 秒（5 tick） | 会动，只显示其中 4 帧 |
| 0.1 秒（2 tick） | 10 帧全部播放 |

### 为什么不会增加服务器负担

- 所有帧的字符串在生成资源包时就已经算好，变量查询只是按时钟取数组中的一项，没有任何计算或数据库读取。
- 每 tick 查询几千次也几乎不占 CPU，可以放心让 TAB 高频刷新。
- 真正的绘制完全由玩家客户端完成。

## 常见搭配示例

```yaml title="TAB · groups.yml"
_DEFAULT_:
  tabprefix: '%clt_use_small% '
  tagprefix: '%clt_use% '
```

```yaml title="聊天插件（示例格式）"
format: '%clt_use_static% &f%player_name%&7: &f{message}'
```

:::tip 需要资源包
变量返回的是资源包里的特殊字符，玩家没有加载云称号的资源包时会显示为方块。见[资源包与合并](./resource-pack.md)。
:::
