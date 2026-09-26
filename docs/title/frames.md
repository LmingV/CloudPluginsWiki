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
  size: 中
  small:
    frames: auto
    size: 特小
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
| `size` | `中`（16 像素） | 大小：`特小` / `小` / `中` / `大` / `特大` / `超大` / `巨大`，或直接写像素数字（最大 256），见[调大小与位置](#调大小与位置) |
| `height` | — | 精确像素高度（进阶），写了就不看 `size` |
| `scale` | `1.0` | 大小倍率，乘在 `height` 上：`2.0` 两倍、`0.5` 一半。必须大于 0，结果最高 256 像素 |
| `align` | `bottom` | 垂直位置：`bottom` 站在名字上方往上长 / `center` 居中 / `top` 往下长 |
| `ascent` | 由 `align` 决定 | 垂直位置：基线以上的像素数，不能大于 `height`；越大越往上 |
| `offset-y` | `0` | 上下移动（像素）：正数往上、负数往下，称号大小不变 |
| `offset-x` | `0` | 称号前的水平偏移，负数往左 |
| `spacing` | `0` | 称号后额外留空的像素 |
| `small.frames` | 见[小图](#小图) | 小图文件夹，`auto` = 自动缩小 |
| `small.size` / `small.height` | `特小`（8 像素） | `%clt_use_small%` 的大小，写法同上；小图的 `align` 默认 `center` |
| `small.scale` | `1.0` | 小图的大小倍率（称号的 `scale` 只影响大图，小图要单独写） |
| `small.align` / `small.offset-y` / `small.ascent` / `small.offset-x` / `small.spacing` | 同上 | 小图各自的位置设置 |

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

## 调大小与位置

**一般只需要写 `size`**，不用算像素：

```yaml
star:
  frames: star
  size: 大          # 头顶称号的大小
  small:
    size: 特小      # TAB / 记分板的小图
```

| `size` | 像素高度 | 适合 |
| --- | --- | --- |
| `特小` / `tiny` | 8 | 和普通文字一样大：TAB、记分板、聊天 |
| `小` / `small` | 12 | 比名字稍大的头顶称号 |
| `中` / `normal` | 16 | 默认值 |
| `大` / `large` | 20 | 显眼的头顶称号 |
| `特大` / `huge` | 28 | 活动、排行榜等特别称号 |
| `超大` / `giant` | 40 | 头顶的大型称号 |
| `巨大` / `colossal` | 56 | 大型活动、赛季冠军等超大称号 |

也可以直接写数字，例如 `size: 18`。宽度不用设，会按图片比例自动计算（256×104 的图设 `size: 大`，游戏里约 49×20 像素）。

**位置已经默认好**：大图（`%clt_use%`）默认 `align: bottom`，站在名字上方往上长，**不会压到下面那行名字**；小图（`%clt_use_small%`）默认 `align: center`，和文字上下居中。一般不需要改。

| `align` | 效果 |
| --- | --- |
| `bottom` | 站在文字底线上，只往上长（大图默认） |
| `center` | 以文字为中心上下延伸（小图默认） |
| `top` | 从文字顶部往下长 |

**想让称号离名字再高一点或低一点**，用 `offset-y`（像素，正数往上、负数往下），称号大小不变：

```yaml
star:
  size: 大
  offset-y: 4       # 往上抬 4 像素；-2 = 往下压 2 像素
```

### 进阶微调

只有在上面不够用时才需要：

| 字段 | 说明 |
| --- | --- |
| `height` | 精确像素高度，写了就不看 `size` |
| `scale` | 在高度上再乘一个倍率（`1.5` = 1.5 倍）。和 `height` / `size` 一起用时要自己算乘积，一般不建议 |
| `ascent` | 精确的垂直位置（文字底线以上的像素数，最大等于高度），写了就不看 `align` |

:::tip 快速试大小
每次改大小都要重新下发资源包，调整起来很慢。调试时可以把 `plugins/CloudTitle/resource_pack/` 整个文件夹复制到**自己电脑**的 `.minecraft/resourcepacks/` 并在游戏中启用，之后每次 `/clt pack` 再把文件夹覆盖过去，按 `F3 + T` 重新加载即可立即看到效果。调好后再正式下发给玩家。
:::

## 修改后生效

```text
/clt reload   # 重载全部配置、菜单、消息，并重新生成资源包
/clt pack     # 只重新加载称号并重新生成资源包
```

重载后已分配的字符保持不变（记录在 `glyphs.yml`），但**新增或修改了图片后，玩家需要重新下载资源包**才能看到变化。

`/clt info <称号ID>` 可查看称号实际加载的帧数、fps 与大小图尺寸，方便排查。
