---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 4
title: 指令
---

# 指令

主指令 `/cosmetics`，别名 `/cosmetic`。所有管理参数均支持 Tab 补全，且只会补全你有权限使用的子指令。

## 玩家指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/cosmetic` | 打开时装菜单 | `cloudcosmetics.use` |
| `/cosmetic help` | 查看可用指令 | 无 |
| `/cosmetic shop` | 打开时装商城 | `cloudcosmetics.shop` |
| `/cosmetic self show` | 显示自己的时装 | `cloudcosmetics.use` |
| `/cosmetic self hide` | 对自己隐藏时装（其他玩家仍可看见） | `cloudcosmetics.use` |
| `/cosmetic others show` | 显示其他玩家的时装 | `cloudcosmetics.use` |
| `/cosmetic others hide` | 隐藏其他玩家的时装（适合低配电脑） | `cloudcosmetics.use` |

`self` / `others` 不带参数时切换当前状态。可见性偏好会保存到数据库，重登后保留。

## 管理员指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/cosmetic give <时装ID> <玩家>` | 永久给予时装与 BUFF | `cloudcosmetics.admin.give` |
| `/cosmetic remove <时装ID> <玩家>` | 收回时装与 BUFF；若正在穿戴会自动卸下 | `cloudcosmetics.admin.remove` |
| `/cosmetic view <玩家>` | 查看玩家已拥有的时装 | `cloudcosmetics.admin.view` |
| `/cosmetic card create <分类> <时装ID> <数量> [玩家]` | 生成时装卡，省略玩家时给自己 | `cloudcosmetics.admin.card` |
| `/cosmetic card give <分类> <时装ID> <数量> <玩家>` | 给指定玩家时装卡 | `cloudcosmetics.admin.card` |
| `/cosmetic npc <分类> <时装ID>` | 在你的位置生成穿着该时装的 NPC | `cloudcosmetics.admin.npc` |
| `/cosmetic npc remove <NPC ID>` | 删除时装 NPC | `cloudcosmetics.admin.npc` |
| `/cosmetic reload` | 重载主配置、消息、菜单与全部时装，并立即重建在线玩家与 NPC 的时装 | `cloudcosmetics.admin.reload` |

### 参数说明

| 参数 | 含义 |
| --- | --- |
| `<分类>` | `cosmetics/` 目录中的文件名（不含 `.yml`），例如 `wings` |
| `<时装ID>` | 该文件中时装的键名，例如 `star_wings` |
| `<数量>` | 1 – 64 |
| `<NPC ID>` | 生成 NPC 时聊天栏会显示 ID，也可 Tab 补全 |

### 常用示例

```text
# 给玩家 Steve 一张星辰之翼时装卡
/cosmetic card give wings star_wings 1 Steve

# 活动补发，直接解锁
/cosmetic give star_wings Steve

# 在主城展示区生成模特 NPC
/cosmetic npc wings star_wings

# 修改配置后热重载（后台也可执行）
/cosmetic reload
```

:::note
`give` / `remove` / `view` / `card` / `reload` 可以在后台执行；`npc` 生成需要由游戏内玩家执行，以取得生成位置。
:::
