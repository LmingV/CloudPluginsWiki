---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 12
title: 数据库与跨服
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 数据库与跨服

云时装保存以下玩家数据：已拥有的时装、当前穿戴、自己 / 他人时装的可见性偏好。所有读写均为**异步**执行，不阻塞主线程。

<Tabs groupId="db">
<TabItem value="sqlite" label="SQLite（单服）" default>

默认方式，无需任何配置，数据保存在 `plugins/CloudCosmetics/data.db`。

```yaml title="config.yml"
database:
  type: sqlite
  file: data.db
```

适合单服，或各分流数据互相独立的情况。SQLite 文件**不能**跨服务器共享。

</TabItem>
<TabItem value="mysql" label="MySQL / MariaDB（跨分流）">

多个分流共享同一份时装所有权与穿戴状态：

```yaml title="config.yml"
database:
  type: mysql              # MariaDB 也填 mysql
  host: 127.0.0.1
  port: 3306
  database: minecraft
  username: cloud
  password: '你的密码'
  table: yunyue_cosmetic_players
  parameters: 'useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8'
```

所有分流必须使用**相同**的主机、数据库名、账号与 `table`。

</TabItem>
</Tabs>

## 跨服同步范围

| 数据 | 是否随 MySQL 跨服 |
| --- | --- |
| 已拥有的时装 | ✅ |
| 当前穿戴的时装 | ✅ |
| 自己 / 他人可见性偏好 | ✅ |
| 不死图腾冷却 | ❌（保存在玩家 PDC） |
| 时装 NPC | ❌（每个服务端独立，保存在 `npc-cosmetics.yml`） |

## 从 SQLite 迁移到 MySQL

1. 在 MySQL 中建立数据库与账号。
2. 各分流停服，修改 `database` 为 `mysql` 并填写连接信息。
3. 启动后插件会自动建表。
4. 原 SQLite 中的数据不会自动搬移，如需保留请先导出再导入到对应数据表。

:::caution 表名保持不变
数据表默认名 `yunyue_cosmetic_players` 为兼容旧版而保留，修改后插件会视为一张新表。
:::
