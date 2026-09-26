---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 7
title: 常见问题
description: 云称号常见问题与排错。
---

# 常见问题

### 称号显示成方块 / 白框？

玩家没有加载最新的资源包。确认资源包已发送给玩家（或已在 ItemsAdder 指定路径 / 同步到 CraftEngine、Nexo 并重新打包），新增或修改图片后需要重新下发。见[资源包与合并](./resource-pack.md)。

### 称号不会动？

1. 确认用的是会动的变量 `%clt_use%` / `%clt_use_small%`，而不是 `_static`。
2. 显示变量的插件需要定时刷新（例如 TAB 插件）；刷新间隔越长，动画跳帧越明显。见[动画与刷新](./placeholders.md#动画与刷新)。
3. 聊天室里的称号永远是静态的，这是 Minecraft 聊天的限制。

### 称号图片变斜或变色？

图片会继承周围文字的样式（物品名称默认斜体、lore 默认紫色）。1.0.0 起 `config.yml` 的 `glyph-color: '&f'` 会自动在称号图片前加上白色并取消斜体；如果你把它改成了空白，请改回 `'&f'`。

### 动画太快 / 太慢？

调整称号的 `fps`（1 – 20）。GIF 没写 `fps` 时会使用 GIF 自己的帧延迟。

### 称号位置太高 / 太低 / 和名字重叠？

调整 `ascent`（垂直位置，越大越高，不能超过 `height`）或 `height`；水平位置用 `offset-x`，与名字的间距用 `spacing`。小图在 `small:` 下单独设置。

### TAB 里的称号太大？

TAB 请使用小图 `%clt_use_small%`。小图默认 8 像素高，可在称号的 `small.height` 或 `config.yml` 的 `defaults.small-height` 调整；想要更清晰可以另外画一套放在 `<文件夹>_small`。

### 会不会和 ItemsAdder 的字符冲突？

不会。云称号默认从 U+F0000 开始分配字符，ItemsAdder 等插件使用 U+E000 – U+F8FF。

### 重载后称号变成别的图？

不会。字符分配记录在 `glyphs.yml`，重载后保持不变。**不要手动修改或删除 `glyphs.yml`**，否则玩家需要重新下载资源包。

### 称号从配置里删掉后，玩家的数据怎么办？

玩家的拥有记录与佩戴记录会保留；该称号不再显示（改为显示默认称号或空白）。把称号加回来后会自动恢复。

### 购买时扣了钱但没拿到称号？

商店会先检查全部价格，任何一项不足都不会扣除；扣款后写入数据库失败时，控制台会输出严重错误并记录玩家与称号，方便补偿。

### 多个服务器共用数据库，另一个服给的称号要重新进服才看得到？

确认使用 MySQL，且 `sync.enabled` 为 `auto` 或 `true`。启动时控制台应出现「跨服同步已开启」。见[跨服同步](./config.md#跨服同步)。

### 支持哪些服务端？

Paper / Purpur / Folia 1.20 – 26.x。Spigot 缺少云称号使用的 Paper API（如 MiniMessage），不支持。
