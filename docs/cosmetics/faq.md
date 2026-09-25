---
last_update:
  date: 2026-09-25
  author: CloudPlugins 团队
sidebar_position: 14
title: 常见问题
---

# 常见问题

## 显示问题

### 只看到一张纸，没有模型？

1. 玩家没有成功加载资源包。
2. `custom-model-data` 或 `item-model` 与资源包不一致。
3. ItemsAdder / CraftEngine 物品 ID 写错。
4. `body.source: vanilla` 只生成了普通纸。

优先使用 `source: itemsadder` / `craftengine` 并填写完整物品 ID。

### meg 时装完全不显示？

- 控制台是否有 `Skipped cosmetic ... type meg requires model`。
- `model` 是否与 ModelEngine 中的模型 ID 一致，是否执行过 `/meg reload`。
- 玩家是否执行过 `/cosmetic self hide`，或观看者执行过 `/cosmetic others hide`。
- 观看者是否超出 `render-distance`，或被 `viewer-budget.max-models` 限制。

### 其他玩家看不到我的时装？

确认 `visibility.others: true`，并且对方没有执行 `/cosmetic others hide`。人多时只会加载离观看者最近的几件时装。

### equipment 把我的头盔外观换掉了？

这就是 `equipment` 的工作方式：同一装备槽客户端只能显示一件。头盔本身与属性仍在。需要保留头盔外观请改用 `body`。

### 调整 offset 高度没有效果？

1. 检查缩进：`offset:` 必须与 `model`、`scale` 同一层，`x` / `y` / `z` 再往内缩两格。缩进错误时 `offset` 会被当成另一件时装。
2. `equipment` 类型不使用 `offset`。
3. 查看启动或 `/cosmetic reload` 时的加载日志，2.10.1 起会显示该时装实际读到的文件路径与 XYZ 偏移。
4. 2.10.0 以前，较大的偏移（例如往上数格）可能被位置检查误判而反复重建，请升级到 2.10.1 以上。
5. 使用 **ModelEngine R4.1** 时，2.10.2 以前的版本偏移完全不生效，请升级到 2.10.3 以上（建议 2.10.5）。
6. 2.10.5 以前 `meg` 时装的偏移方向是反的；升级后若位置跑到另一边，把 `offset` 的正负号反过来。

### 修改了时装却不生效，好像读的是别的文件？

不同文件中出现**相同的时装 ID** 时，插件按文件名顺序只保留第一个，其余会被跳过并在控制台警告。请确认 ID 没有重复。

## 跟随与动画

### 转身时模型慢半拍？

改用 `rotation.mode: rigid`；纯物品背饰可改为 `equipment`，与玩家完全同步。详见[转向与跟随](./define/rotation-follow.md)。

### 模型卡在原地不动？

保持 `follow-watchdog.enabled: true`，插件会在数秒内自动重建。频繁发生时，检查是否有其他插件拦截实体或乘客数据包。

### 动画只播一次就回到 idle？

动画是否循环由模型文件决定。一次性动画播完会停止，请在 Blockbench 中把该动画设为循环。

### 远处玩家的动画停住了？

`animation.distance-optimization: true` 会让远处模型降频，改为 `false` 即可。

## 解锁与属性

### OP 自动拥有全部时装与 BUFF？

这是 `ownership.op-has-all: true` 的效果，测试解锁流程请用普通账号或改为 `false`。

### 给了 permission 权限节点，玩家还是不能穿？

时装所有权以数据库为准，请通过时装卡、商城或 `/cosmetic give` 解锁。详见[权限](./permissions.md#时装的-permission-字段)。

### BUFF 没有生效？

确认已安装 MythicLib，且属性名称是 MythicLib 已注册的属性。

### 商城打不开？

- 控制台出现「Vault 未启用」：安装 Vault 与经济插件。
- 提示没有权限：检查 `cloudcosmetics.shop`。

## 其他

### 修改 YML 后没有变化？

执行 `/cosmetic reload`（后台也可执行），并查看控制台是否有 YAML 格式错误。修改模型或资源包时，还需要重载 ModelEngine 并让玩家更新资源包。

### 可以同时装 YunYueCosmetics 和 CloudCosmetics 吗？

不可以。同一服务端只能保留一份，升级方式见[安装与升级](./install.md#从旧版升级)。
