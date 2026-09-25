---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 5
title: Lore 与时装卡
---

# Lore 与时装卡

## 时装说明 lore

每件时装可以写自己的说明，显示在衣橱、管理查看与商城中（不影响时装卡）。

```yaml
star_wings:
  type: meg
  name: '<gradient:#FFE153:#66CCFF>星辰之翼</gradient>'
  lore:
    - '&7由星光凝成的双翼，随主人飞翔。'
    - '<gradient:#FFF7C2:#69ECFF>限定 · 星辰系列</gradient>'
    - ''
    - '{default_lore}'
```

| 写法 | 效果 |
| --- | --- |
| 不写 `lore` | 使用默认说明（拥有状态、穿戴操作、价格等） |
| 写 `lore` 列表 | **完全取代**默认说明 |
| `lore: []` | 清空说明 |
| 列表中独立一行 `{default_lore}` | 在该位置插入默认说明 |

可用占位符：

| 占位符 | 内容 |
| --- | --- |
| `{default_lore}` | 默认说明（需独立一行） |
| `{stats}` | 属性 BUFF 列表（需独立一行；无属性时不插入） |
| `{cosmetic_name}` | 时装名称 |
| `{permission}` | 时装的 permission 字段 |
| `{price}` | 商城价格 |
| `{status}` | 当前状态（衣橱：拥有 / 穿戴；商城：可购买 / 已拥有） |

## 时装卡

时装卡是一件普通物品，玩家**右键使用**后：

1. 扣除一张卡；
2. 时装永久写入数据库；
3. 属性 BUFF 立即重新计算；
4. 可以在衣橱中自由穿戴。

已拥有该时装时使用卡片**不会扣卡**，玩家不会误用浪费。时装卡可以交易、放进礼包、抽奖或任务奖励。

### 生成时装卡

```text
/cosmetic card create <分类> <时装ID> <数量> [玩家]
/cosmetic card give   <分类> <时装ID> <数量> <玩家>
```

### 默认外观

所有时装卡的默认样式写在 `config.yml`：

```yaml title="config.yml"
card:
  item: PAPER
  custom-model-data: 0
  item-model: ''
  name: '&6{cosmetic_name} 时装卡'
  lore:
    - '&e使用后可永久获得该时装'
    - ''
    - '{stats}'
```

### 单件时装覆盖

在时装内加入 `card` 区块即可覆盖默认样式：

```yaml
  card:
    material: PAPER
    custom-model-data: 10017
    item-model: ''
    name: '<gradient:#FFE153:#66CCFF>时装卡 · 星辰之翼</gradient>'
    lore:
      - '&7右键永久解锁：'
      - '{cosmetic_name}'
      - ''
      - '{stats}'
      - ''
      - '&e右键使用'
```

:::note
时装卡通过物品内部数据识别，改名、修改 lore 不会让已发出的卡片失效；但请不要修改已发放卡片对应的时装 ID。
:::
