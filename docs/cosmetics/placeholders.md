---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 13
title: PlaceholderAPI 变量
---

# PlaceholderAPI 变量

安装 [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) 后，云时装会自动注册以下变量，无需下载额外扩展。启动时控制台出现「PlaceholderAPI 变量已注册」即表示成功。

## 变量列表

| 变量 | 返回内容 | 示例 |
| --- | --- | --- |
| `%cloudcosmetics_totem_remaining%` | 图腾剩余冷却（按 `totem.time-format`），就绪时为空 | `4分32秒` |
| `%cloudcosmetics_totem_remaining_seconds%` | 剩余冷却秒数，就绪时为 `0` | `272` |
| `%cloudcosmetics_totem_ready%` | 图腾是否就绪 | `true` / `false` |
| `%cloudcosmetics_totem_status%` | 就绪显示 `totem.status-ready`，冷却中显示 `totem.status-cooling` | `已就绪` / `4分32秒` |
| `%cloudcosmetics_totem_wearing%` | 当前穿戴的时装是否带有图腾 | `true` / `false` |
| `%cloudcosmetics_equipped%` | 当前穿戴的时装 ID，未穿戴为空；[多件穿戴](./loadout.md)时为最后穿戴的一件 | `samsara_scroll` |
| `%cloudcosmetics_equipped_name%` | 当前穿戴的时装名称 | `轮回生死轴` |

## 使用示例

把内置提示关掉，改放到计分板：

```yaml title="config.yml"
totem-notify:
  mode: none
```

```yaml title="计分板插件（示例）"
lines:
  - '&7当前时装：&f%cloudcosmetics_equipped_name%'
  - '&7不死图腾：%cloudcosmetics_totem_status%'
```

自定义 `%cloudcosmetics_totem_status%` 的显示内容：

```yaml title="messages.yml"
totem:
  status-ready: '&a● 可用'
  status-cooling: '&c● {remaining}'
```

:::note
变量需要玩家在线才会返回内容；离线玩家返回空字符串。
:::
