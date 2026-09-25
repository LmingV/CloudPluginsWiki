---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 2
title: 商店与获取方式
description: 称号商店（金币 / 点券 / 物品）、称号卡、活动发放与限时称号。
---

# 商店与获取方式

玩家可以通过以下方式获得称号，每个称号可以任选其中几种：

| 方式 | 说明 |
| --- | --- |
| 称号商店 | `/clt shop` 用金币、点券、物品购买 |
| 称号卡 | 右键使用获得称号，可作为活动奖励、礼包、交易物品 |
| 管理员 / 活动发放 | `/clt give`，或由其他插件执行指令、调用 [API](./api.md) |

所有获得、续期、收回与到期都会记入[操作日志](./commands.md#操作日志)。

## 商店

在称号配置中加入 `shop:` 即可上架：

```yaml title="titles/my.yml"
star:
  name: '&e星辰'
  shop:
    enabled: true
    duration: 30d          # 购买获得的时长；permanent = 永久
    money: 5000            # Vault 金币
    points: 100            # PlayerPoints 点券
    items:                 # 物品（空格后面是显示名称）
      - 'DIAMOND*5 钻石'
      - 'mmoitems:MATERIAL:RUBY*3 红宝石'
    permission: ''         # 需要该权限才能购买，留空 = 所有人
```

- `money`、`points`、`items` **写了的都要付**，可以只写其中一种，也可以组合。都不写 = 免费领取。
- **缺一样就什么都不扣**：金币、点券、物品任何一项不够，会列出还缺多少，其余也不会被扣除。
- 点击称号后会提示「再次点击确认购买」，在 `menus/shop.yml` 的 `confirm-seconds`（默认 5 秒）内再点一次才会购买，防止误触。
- 已**永久**拥有的称号不能重复购买；拥有**限时**版本时再次购买会**续期**（在原到期时间上累加），购买永久版则升级为永久。

### 物品写法

| 写法 | 物品 |
| --- | --- |
| `DIAMOND*5` | 原版物品 × 5 |
| `mmoitems:类型:ID*3` | MMOItems 物品，例如 `mmoitems:MATERIAL:RUBY*3` |
| `ia:命名空间:ID*2` | ItemsAdder 物品 |
| `ce:命名空间:ID` | CraftEngine 物品 |
| `nexo:ID` | Nexo 物品 |

- 不写 `*数量` 时为 1。
- 在后面加空格和名称，会作为价格里显示的名字：`'DIAMOND*5 钻石'`。
- **原版物品只接受「普通」物品**：改过名字、带说明或自定义模型的钻石不会被当成价格扣掉，避免玩家珍藏的特殊物品被误收。

## 获取方式说明

不在商店出售的称号（活动、会员、比赛奖励……），可以写 `obtain:` 告诉玩家怎么获得：

```yaml
vip:
  name: '&6VIP'
  obtain: '&6开通 VIP 会员 / 活动称号卡'
```

它会显示在称号仓库里**未拥有**的称号上（仓库 lore 中的 `{obtain}`）。没写 `obtain:` 但在商店出售的称号，会自动显示「称号商店购买」。

## 称号卡

称号卡是一个物品，**右键使用**即可获得对应称号：

```text
/clt card <玩家> <称号ID> [时长|default] [数量]
/clt card Steve vip 7d 3       # 给 Steve 3 张「7 天 VIP」称号卡
/clt card Steve vip            # 使用称号配置里的默认时长
```

```yaml title="titles/my.yml"
vip:
  card:
    enabled: true            # false = 该称号的卡片停用（已发出的卡无法使用）
    duration: 7d             # 指令没写时长时使用
    material: PAPER          # 以下三项不写则使用 config.yml 的 card 设置
    custom-model-data: 0
    item-model: ''
```

- 已**永久**拥有该称号时，称号卡**不会被消耗**。
- 限时称号卡可以叠加：用两张 7 天卡 = 14 天。
- 卡片外观（名称、说明）在 `config.yml` 的 `card:` 中设置，支持 `{preview}` 称号图、`{lore}`、`{stats}`、`{time}`。
- **卡片会自动更新**：修改称号名称或说明后 `/clt reload`，玩家背包里已有的卡片会同步更新成新样式。

## 活动与指令发放

```text
/clt give <玩家> <称号ID> [时长]
/clt give Steve star 7d        # 7 天
/clt give Steve star           # 永久
```

- 玩家不在线也可以发放（需要曾经进入过服务器）。
- 其他插件（活动、任务、抽奖）可以直接执行这条指令，或使用 [API](./api.md)。

## 限时称号

时长格式：`30s`、`10m`、`12h`、`7d`、`2w`，可组合：`1d12h`。`permanent` / `永久` 表示永久。

- 到期后自动收回，正在佩戴时会自动卸下，并提示玩家「你的称号已到期」。
- 剩余时间显示在仓库中，也可用变量 `%clt_expire_<称号ID>%` 显示。
- 重复获得同一限时称号会在原到期时间上累加；获得永久版则直接变为永久。
