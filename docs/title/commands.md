---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 5
title: 指令
description: 云称号的玩家指令与管理员指令。
---

# 指令

主指令 `/cloudtitle`，别名 `/clt`。直接输入 `/clt` 等于 `/clt open`。
所有参数都支持 Tab 补全，且只会补全你有权限使用的子指令。

## 玩家指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/clt open [页码]` | 打开称号仓库，点击佩戴 / 卸下 | `cloudtitle.use` |
| `/clt shop [页码]` | 打开称号商店 | `cloudtitle.shop` |
| `/clt showcase [玩家]` | 查看某位玩家拥有的称号（只读），不填为自己 | `cloudtitle.showcase` |
| `/clt use <称号ID>` | 佩戴称号 | `cloudtitle.use` |
| `/clt unequip` | 卸下称号 | `cloudtitle.use` |
| `/clt list` | 在聊天栏列出拥有的称号与剩余时间 | `cloudtitle.use` |
| `/clt help` | 查看可用指令（管理指令只对有权限的人显示） | 无 |

切换称号有冷却（`config.yml` 的 `switch-cooldown-seconds`，默认 3 秒），拥有 `cloudtitle.bypass.cooldown` 的玩家不受限制。

## 管理员指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/clt give <玩家> <称号ID> [时长]` | 给予称号，时长如 `7d`、`12h`，不写为永久；玩家可不在线 | `cloudtitle.admin.give` |
| `/clt take <玩家> <称号ID>` | 收回称号，正在佩戴时自动卸下 | `cloudtitle.admin.take` |
| `/clt card <玩家> <称号ID> [时长\|default] [数量]` | 给予称号卡（玩家需在线） | `cloudtitle.admin.card` |
| `/clt view <玩家>` | 打开该玩家的称号仓库进行管理 | `cloudtitle.admin.view` |
| `/clt log <玩家> [页码]` | 查看该玩家的称号操作日志 | `cloudtitle.admin.log` |
| `/clt info <称号ID>` | 查看称号的加载信息（帧数、fps、大小图尺寸） | `cloudtitle.admin.info` |
| `/clt reload` | 重载全部配置、菜单、消息，并重新生成资源包 | `cloudtitle.admin.reload` |
| `/clt pack` | 只重新加载称号并重新生成资源包 | `cloudtitle.admin.pack` |

### 管理界面操作

`/clt view <玩家>` 打开后：

| 操作 | 效果 |
| --- | --- |
| 左键未拥有的称号 | 永久给予 |
| Shift + 左键 | 给予（如未拥有）并设为佩戴 |
| 右键已拥有的称号 | 收回 |
| 「卸下」按钮 | 卸下该玩家当前的称号 |

每项操作都需要对应的 `give` / `take` 权限。

### 操作日志

`/clt log <玩家>` 按时间倒序列出该玩家的记录，每页 10 条：

```text
[09-26 14:30] 购买 星辰 30天 · shop:5000金币
[09-26 14:12] 称号卡 VIP 7天 · card
[09-25 20:01] 收回 云称号 admin:Steve
[09-25 19:59] 到期 VIP expire
```

记录的操作：获得、续期、购买（含价格）、称号卡、收回（含操作者）、到期；在 `config.yml` 开启 `log.equip` 后也会记录佩戴 / 卸下。
日志默认保留 90 天（`log.keep-days`），启动时自动清理更早的记录。

## 时长格式

`30s` 秒 · `10m` 分 · `12h` 小时 · `7d` 天 · `2w` 周，可组合如 `1d12h`；`permanent` / `永久` 为永久。
