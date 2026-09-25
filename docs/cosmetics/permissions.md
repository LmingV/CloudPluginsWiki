---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 5
title: 权限
---

# 权限

2.9.9 起提供完整的 `cloudcosmetics.*` 权限组，管理权限可以细分到每一条指令，方便把「发卡」「查看」这类权限单独交给客服或活动组。

## 权限树

```text
cloudcosmetics.*                    全部权限（默认 OP）
├── cloudcosmetics.use              使用衣橱、穿戴、可见性切换（默认所有人）
├── cloudcosmetics.shop             使用时装商城（默认所有人）
└── cloudcosmetics.admin            全部管理指令（默认 OP）
    ├── cloudcosmetics.admin.give
    ├── cloudcosmetics.admin.remove
    ├── cloudcosmetics.admin.view
    ├── cloudcosmetics.admin.card
    ├── cloudcosmetics.admin.npc
    └── cloudcosmetics.admin.reload
```

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `cloudcosmetics.*` | OP | 全部权限 |
| `cloudcosmetics.use` | 所有人 | 打开衣橱、穿戴 / 卸下、`self` 与 `others` 切换 |
| `cloudcosmetics.shop` | 所有人 | 打开商城（指令与菜单中的商城按钮都会检查） |
| `cloudcosmetics.admin` | OP | 包含下列全部子权限 |
| `cloudcosmetics.admin.give` | OP | `/cosmetic give` |
| `cloudcosmetics.admin.remove` | OP | `/cosmetic remove` |
| `cloudcosmetics.admin.view` | OP | `/cosmetic view` |
| `cloudcosmetics.admin.card` | OP | `/cosmetic card create` / `give` |
| `cloudcosmetics.admin.npc` | OP | `/cosmetic npc` |
| `cloudcosmetics.admin.reload` | OP | `/cosmetic reload` |
| `yunyuecosmetics.admin` | OP | **旧版兼容**，等同全部管理权限 |

## LuckPerms 配置示例

```text
# 客服组：只能发卡与查看
/lp group helper permission set cloudcosmetics.admin.card true
/lp group helper permission set cloudcosmetics.admin.view true

# 管理组：全部管理指令
/lp group admin permission set cloudcosmetics.admin true

# 暂时关闭商城（例如维护经济系统时）
/lp group default permission set cloudcosmetics.shop false
```

## 时装的 permission 字段

每件时装可写 `permission`，未填写时默认为 `cloudcosmetics.cosmetic.<时装ID>`。

:::info 所有权以数据库为准
时装是否「已拥有」由**数据库记录**决定（时装卡、商城、`/cosmetic give`），OP 在 `op-has-all: true` 时视为全部拥有。
`permission` 字段用于衣橱说明中的 `{permission}` 占位符显示，**不会**因为玩家拥有该权限节点而自动解锁时装。
:::

## 从旧权限迁移

旧版只有 `yunyuecosmetics.admin` 一个权限，升级后**无需任何修改**即可继续使用。想改用新权限组时：

1. 给对应权限组加上 `cloudcosmetics.admin`（或细分子权限）。
2. 移除旧的 `yunyuecosmetics.admin`。
