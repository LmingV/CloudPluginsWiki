---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 2
title: 主配置
description: config.yml 全部设置：默认值、属性、称号卡、日志、聊天、跨服同步、资源包。
---

# 主配置

`plugins/CloudTitle/config.yml`，修改后 `/clt reload`（数据库设置需要重启服务端）。

## 基础

```yaml
# 没有佩戴称号时显示的称号 ID（必须是已定义的称号）；留空则变量返回空白
default-title: ''
# 切换称号的冷却（秒），0 = 不限制
switch-cooldown-seconds: 3

# 称号未单独设置时使用的默认值
defaults:
  fps: 8            # GIF 未设 fps 时使用 GIF 自己的帧延迟
  height: 16        # %clt_use% 大图高度
  small-height: 8   # %clt_use_small% 小图高度
```

## 属性

```yaml
stats:
  mode: equipped    # equipped 佩戴才生效 / owned 拥有即生效 / none 关闭
```

见[属性加成](./stats.md)。

## 称号卡

```yaml
card:
  material: PAPER
  custom-model-data: 0
  item-model: ''
  name: '&6称号卡 &8· &r{name}'
  lore: ['{preview}', '', '{lore}', '&7时长：&e{time}', '{stats}', '', '&e右键使用']
  glow: true
```

每个称号也可以在自己的 `card:` 中单独覆盖材质与模型，见[称号卡](./obtain.md#称号卡)。

## 操作日志

```yaml
log:
  keep-days: 90     # 保留天数，0 = 永久保留
  equip: false      # 是否也记录佩戴 / 卸下（数量较多）
```

## 聊天悬停

```yaml
chat:
  hover:            # %clt_use_hover% 与 API 的悬停文本
    - '{name}'
    - '{lore}'
    - '{stats}'
    - '&7{expire}'
```

`{expire}` 在永久称号上显示 `messages.yml` 的 `time-permanent`，限时称号显示 `hover-expire`（剩余 X）。

## 数据库

```yaml
database:
  type: sqlite          # sqlite 或 mysql（MariaDB 也填 mysql）
  file: data.db
  host: 127.0.0.1
  port: 3306
  database: minecraft
  username: root
  password: ''
  parameters: 'useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8'
  table-prefix: clt_
  pool-size: 4
```

- **SQLite**：单服默认，无需任何设置。
- **MySQL 8 / MariaDB**：多个服务器共用时使用。插件自带连接池并已内置于 jar 中，**启动时不需要从网络下载任何依赖**；MySQL / SQLite 驱动由 Paper 自带。
- MySQL 8 使用 `caching_sha2_password` 且未开 SSL 时，`parameters` 需加上 `allowPublicKeyRetrieval=true`。
- 所有数据库读写都在独立线程执行，不会卡主线程。
- 数据表：`clt_players`（佩戴）、`clt_owned`（拥有）、`clt_log`（日志）、`clt_changes`（跨服同步）。

## 跨服同步

多个分流共用同一个 MySQL 时，一个服务器上的变更（给予、购买、佩戴、到期……）会在几秒内同步到玩家当前所在的服务器，**不需要重新进服**。

```yaml
sync:
  enabled: auto          # auto = 使用 MySQL 时开启；true / false
  interval-seconds: 3    # 检查间隔
  server-id: ''          # 留空自动生成，仅用于区分变更来源
```

- 例如：玩家在生存服，管理员在大厅执行 `/clt give`，称号会在约 1 – 3 秒内出现在玩家的仓库与变量中；收回时也会自动卸下。
- 玩家切换服务器时本来就会重新读取数据，不受同步间隔影响。
- 同步只用一张很小的表，每次检查是一条带索引的查询，对数据库几乎没有负担；超过 1 小时的同步记录会自动清理。
- 各服务器的 `titles/` 与 `frames/` 建议保持一致（可用同步工具或共享目录），否则某些称号只在部分服务器存在。

## 资源包

```yaml
resource-pack:
  output: resource_pack
  zip: true
  glyph-start: 'F0000'
  merge: { … }
```

见[资源包与合并](./resource-pack.md)。
