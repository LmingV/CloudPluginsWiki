---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 3
title: 安装与升级
---

# 安装与升级

## 运行环境

| 项目 | 要求 |
| --- | --- |
| 服务端 | Paper / Purpur **1.20 – 26.x** |
| Java | 1.20 – 1.21 使用 Java 21；26.x 使用 Java 25 |
| 不支持 | 原生 Spigot、Folia、Fabric、Forge |

:::note 兼容性说明
插件以 Paper 1.20 API 编译，已针对 1.20 / 1.20.1 / 1.20.4 / 1.20.6 / 1.21.4 / 1.21.11 / 26.1.2 / 26.2 的真实 API 做过自动化回归测试。
新旧版本差异（item-model、Display 插值、实体追踪 API）由插件自动适配。第三方前置插件请各自选用支持目标版本的发行版。
:::

## 前置插件

| 插件 | 类型 | 用途 |
| --- | --- | --- |
| **ModelEngine R4** | 必需 | 加载与渲染 `meg` 模型；兼容 R4.0.9 与 R4.1.0（R4.1 需插件 2.10.3 以上） |
| **packetevents** | 必需 | BODY 虚拟乘客、数据包层面的可见性控制 |
| MythicLib | 可选 | 时装属性 BUFF |
| MMOItems | 可选 | 与 MythicLib 属性系统搭配 |
| Vault + 经济插件 | 可选 | 时装商城；未安装时商城暂停，衣橱不受影响 |
| Citizens | 可选 | 时装展示 NPC |
| ItemsAdder | 可选 | BODY 时装使用 ItemsAdder 完整物品 |
| CraftEngine | 可选 | BODY 时装物品、衣橱与商城图标 |
| PlaceholderAPI | 可选 | 提供 `%cloudcosmetics_...%` 变量（图腾冷却、当前时装） |

SQLite、MySQL 驱动与 MiniMessage 由服务端在首次启动时自动下载，无需手动安装。

## 全新安装

1. 安装必需的前置插件。
2. 把 `CloudCosmetics-3.1.0.jar` 放进 `plugins/`。同一个服务端**只能保留一份**云时装 JAR。
3. 启动服务端，自动生成以下文件（首次生成的配置、菜单与提示消息全部为**简体中文**）：

```text
plugins/CloudCosmetics/
├── config.yml            # 主配置：渲染、转向、性能、数据库、默认时装卡
├── messages.yml          # 全部提示消息与 BUFF 显示名称
├── data.db               # SQLite 数据（使用 SQLite 时）
├── npc-cosmetics.yml     # 时装 NPC 记录
├── cosmetics/            # 每个 .yml = 一个时装分类（等级）
│   └── wings.yml         # 范例：星辰之翼 + 三种模式模板
└── menus/
    ├── categories.yml    # 分类选择页
    ├── wardrobe.yml      # 衣橱
    └── shop.yml          # 商城
```

4. 导入模型并更新资源包，参考[快速开始](./quick-start.mdx)。

## 从旧版升级

1. 正常关闭服务端，**备份** `plugins/CloudCosmetics/`（或旧的 `plugins/YunYueCosmetics/`）。
2. 删除旧 JAR，放入新 JAR。
3. 启动服务端。

### 从 YunYueCosmetics（云月时装）升级

- 若 `plugins/CloudCosmetics/` 尚不存在，首次启动会**完整复制**旧的 `YunYueCosmetics` 文件夹，原数据保留不动。
- 若 `CloudCosmetics` 文件夹已存在，则直接使用新文件夹，不会自动合并。
- 旧的 `yunyuecosmetics.admin` 权限仍然有效；已发出的时装卡、图腾冷却、数据库表名全部兼容。
- 指令仍然是 `/cosmetic`。

:::caution 不要同时安装两个版本
同一个 `plugins/` 目录中同时存在 YunYueCosmetics 与 CloudCosmetics 会导致冲突。
:::

## 安装后验证

- 控制台出现 `Loaded N cosmetic(s).`
- 安装了 Vault 时出现「时装商城已连接经济服务」
- 游戏内执行 `/cosmetic help`，管理员能看到完整管理指令
