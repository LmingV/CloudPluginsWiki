---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 6
title: 权限
description: 云称号的权限组，细分到每条管理指令。
---

# 权限

## 权限组

| 权限 | 默认 | 包含 |
| --- | --- | --- |
| `cloudtitle.*` | OP | 下列全部权限 |
| `cloudtitle.admin` | OP | 全部 `cloudtitle.admin.*` 管理权限 |

## 玩家权限

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `cloudtitle.use` | 所有人 | 打开称号仓库、佩戴、卸下、列出称号 |
| `cloudtitle.shop` | 所有人 | 打开称号商店并购买 |
| `cloudtitle.showcase` | 所有人 | 查看其他玩家拥有的称号 |
| `cloudtitle.card.use` | 所有人 | 右键使用称号卡 |
| `cloudtitle.bypass.cooldown` | OP | 切换称号不受冷却限制 |

## 管理权限

| 权限 | 说明 |
| --- | --- |
| `cloudtitle.admin.give` | `/clt give`，以及管理界面中的左键给予 |
| `cloudtitle.admin.take` | `/clt take`，以及管理界面中的右键收回 |
| `cloudtitle.admin.card` | `/clt card` 给予称号卡 |
| `cloudtitle.admin.view` | `/clt view` 打开玩家的称号仓库 |
| `cloudtitle.admin.log` | `/clt log` 查看操作日志 |
| `cloudtitle.admin.info` | `/clt info` 查看称号加载信息 |
| `cloudtitle.admin.reload` | `/clt reload` 重载全部配置 |
| `cloudtitle.admin.pack` | `/clt pack` 重新生成资源包 |

## 常见配置

**客服 / 活动管理员**：只能发放与查看，不能收回或重载。

```text
/lp group helper permission set cloudtitle.admin.give true
/lp group helper permission set cloudtitle.admin.card true
/lp group helper permission set cloudtitle.admin.view true
/lp group helper permission set cloudtitle.admin.log true
```

**某个称号只允许 VIP 购买**：在称号的 `shop.permission` 写一个权限（例如 `cloudtitle.buy.vip`），再把它给 VIP 组。没有权限的玩家在商店里会看到「你没有购买资格」。
