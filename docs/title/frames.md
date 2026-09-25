---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 1
title: 序列帧与称号配置
description: 序列帧文件夹规则、fps、大图与小图，以及称号的全部配置字段。
---

# 序列帧与称号配置

一个称号 = `titles/` 里的一段配置 + `frames/` 里的一组图片。

## 序列帧文件夹

图片放在 `plugins/CloudTitle/frames/<文件夹>/`，文件夹名称随意（称号配置里用 `frames:` 指定）。

| 放入的内容 | 效果 |
| --- | --- |
| 多张 PNG | 按文件名中的**数字顺序**播放并循环：`a1, a2 … a9, a10`（自然排序，`a10` 不会排在 `a2` 前面） |
| 一张 PNG | 静态称号 |
| 一个 GIF | 自动拆成每一帧，并沿用 GIF 自己的帧延迟作为默认 fps |

- **不需要 `.mcmeta`**，播放速度直接在称号配置里用 `fps` 调整。
- 同一称号的每帧尺寸应一致；尺寸不同时会以第一帧为准对齐，并在控制台提示。
- 建议图片高度为显示高度的 2 – 4 倍（例如显示 16 像素高，图片做 32 – 64 像素高），更清晰；更大的图片会自动缩小，不会让资源包变得巨大。

## 小图

`%clt_use_small%` 显示的小图按以下顺序决定来源：

1. 称号配置里写了 `small.frames: <文件夹>` → 用这个文件夹（名称随意）
2. 否则，如果存在 `<大图文件夹>_small`（例如 `frames/star_small/`）→ 自动使用
3. 否则 → 从大图**自动缩小**

```text
frames/
├── star/          ← 大图 a1.png … a8.png
└── star_small/    ← 小图（可选，另外画一套更清晰的小尺寸版本）
```

小图与大图的帧数可以不同，会各自循环。

## 称号配置

`plugins/CloudTitle/titles/` 下的所有 `.yml` 都会按文件名顺序加载，最外层的每个键就是一个**称号 ID**。
ID 只能使用小写字母、数字、`_` 与 `-`（1 – 48 个字符），不能重复（重复时保留先加载的，并在控制台提示）。

```yaml title="titles/my.yml"
star:
  name: '<gradient:#FFE153:#66CCFF>星辰</gradient>'   # 支持 & 色码与 MiniMessage
  frames: star
  fps: 8
  height: 16
  small:
    frames: auto
    height: 8
  icon:
    material: NETHER_STAR
  lore:
    - '&7闪烁的星辰称号'
  order: 1
```

### 显示字段

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `name` | 称号 ID | 称号名称，用于菜单、提示与 `%clt_use_name%` |
| `frames` | 称号 ID | 大图序列帧文件夹（`frames/` 下），也可以写单个文件，如 `vip/vip.png` |
| `fps` | GIF 帧延迟，否则 `config.yml` 的 `defaults.fps` | 每秒播放几帧，1 – 20（超过 20 自动改为 20） |
| `height` | `defaults.height`（16） | `%clt_use%` 的显示高度（像素，普通文字约 8） |
| `ascent` | 自动居中 | 垂直位置：基线以上的像素数，不能大于 `height`；越大越往上 |
| `offset-x` | `0` | 称号前的水平偏移，负数往左 |
| `spacing` | `0` | 称号后额外留空的像素 |
| `small.frames` | 见[小图](#小图) | 小图文件夹，`auto` = 自动缩小 |
| `small.height` | `defaults.small-height`（8） | `%clt_use_small%` 的显示高度 |
| `small.ascent` / `small.offset-x` / `small.spacing` | 同上 | 小图各自的位置设置 |

### 菜单字段

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `icon.material` | `NAME_TAG` | 菜单中的物品材质；也可简写为 `icon: GOLD_INGOT` |
| `icon.custom-model-data` | `0` | 自定义模型数据 |
| `icon.item-model` | 空 | 1.21.4+ 的物品模型，例如 `myitems:star_icon` |
| `lore` | 空 | 称号说明，菜单中以 `{lore}` 插入 |
| `order` | `0` | 排序，越小越前 |
| `menu-slot` / `menu-page` | 自动 | 固定在仓库的某页某格（格位从 0 起算，页码从 1 起算） |

### 获取与属性字段

| 字段 | 说明 |
| --- | --- |
| `obtain` | 获取方式说明，显示在仓库的未拥有称号上，例如 `'&6冬至活动限定'` |
| `shop` | 商店价格，见[商店与获取方式](./obtain.md#商店) |
| `card` | 称号卡设置，见[称号卡](./obtain.md#称号卡) |
| `stats` | 属性加成，见[属性加成](./stats.md) |

## 修改后生效

```text
/clt reload   # 重载全部配置、菜单、消息，并重新生成资源包
/clt pack     # 只重新加载称号并重新生成资源包
```

重载后已分配的字符保持不变（记录在 `glyphs.yml`），但**新增或修改了图片后，玩家需要重新下载资源包**才能看到变化。

`/clt info <称号ID>` 可查看称号实际加载的帧数、fps 与大小图尺寸，方便排查。
