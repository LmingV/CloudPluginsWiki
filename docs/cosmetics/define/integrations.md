---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 8
title: ItemsAdder 与 CraftEngine
---

# ItemsAdder 与 CraftEngine

已经用 ItemsAdder 或 CraftEngine 做好的物品，可以直接拿来当时装，不必手抄 CustomModelData 或模型编号。

## BODY 时装使用 ItemsAdder 物品

```yaml
spirit_armor:
  type: body
  name: '&f灵式启程装甲'
  icon:
    material: PAPER
  body:
    source: itemsadder
    item: 'yunyue:spirit_body'   # 命名空间:物品ID
    anchor: BODY
```

插件会向 ItemsAdder 取得**完整物品**（材质、CustomModelData、item-model 与必要组件），避免只显示一张纸。

## BODY 时装使用 CraftEngine 物品

```yaml
ce_armor:
  type: body
  name: '&bCraftEngine 时装'
  icon:
    material: PAPER
  body:
    source: craftengine
    item: 'your_namespace:your_item'
    anchor: BODY
```

- 使用 `itemsadder` / `craftengine` 来源时，`body` 中不需要再写 `material` 或模型编号。
- 插件复制一份物品用于展示，**不会修改**原物品。
- 物品 ID 不存在或插件未启用时，该时装不生成展示物品，控制台会记录原因。
- 更新物品后执行 `/cosmetic reload` 即可重建。

## CraftEngine 作为衣橱 / 商城图标

任何类型的时装（包括 `meg`）都可以使用 CraftEngine 物品作为菜单图标：

```yaml
  icon:
    source: craftengine
    item: 'your_namespace:your_item'
    material: PAPER   # CraftEngine 不可用时的备用图标
```

使用 CE 图标时，`icon.custom-model-data` 与 `icon.item-model` 不会覆盖 CE 模型；名称、说明与状态仍由时装设置决定。

:::note
分类按钮、导航按钮与时装卡目前不支持 CE 来源。客户端仍需加载 ItemsAdder / CraftEngine 生成的资源包。
:::
