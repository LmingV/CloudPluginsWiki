---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 4
title: 资源包与合并
description: 云称号资源包的生成、发送给玩家，以及合并进 ItemsAdder / CraftEngine / Nexo。
---

# 资源包与合并

每次 `/clt reload` 或 `/clt pack`，云称号都会重新生成资源包：

| 输出 | 位置 |
| --- | --- |
| 资源包文件夹 | `plugins/CloudTitle/resource_pack/` |
| 资源包压缩包 | `plugins/CloudTitle/CloudTitle-pack.zip` |
| 字符分配表 | `plugins/CloudTitle/glyphs.yml`（请勿手动修改） |

资源包声明支持 1.20 到最新版本的客户端，无需按版本分别打包。

## 发送给玩家

根据你服务器的情况二选一：

- **已经使用 ItemsAdder / CraftEngine / Nexo** —— 使用下方的自动合并，由它们统一打包和发送。
- **没有资源包插件** —— 把 `CloudTitle-pack.zip` 上传到网盘 / 对象存储 / 自建网页，在 `server.properties` 设置 `resource-pack=` 下载地址（建议同时填写 `resource-pack-sha1`）。

:::warning 修改图片后要重新下发
新增称号或修改图片后，资源包内容会改变，玩家需要重新下载资源包才会看到新图片（否则显示为方块）。
:::

## 自动合并

检测到对应插件时，云称号会把资源包复制到它们的资源目录，由它们统一打包：

| 插件 | 同步到 | 之后执行 |
| --- | --- | --- |
| ItemsAdder | `plugins/ItemsAdder/contents/cloudtitle/resourcepack` | `/iazip` |
| CraftEngine | `plugins/CraftEngine/resources/cloudtitle/resourcepack` | `/ce reload` |
| Nexo | `plugins/Nexo/pack/external_packs/CloudTitle` | `/nexo reload pack` |

```yaml title="config.yml"
resource-pack:
  merge:
    itemsadder:
      enabled: auto        # auto = 检测到该插件才同步；true = 总是同步；false = 不同步
      plugin: ItemsAdder
      path: plugins/ItemsAdder/contents/cloudtitle/resourcepack
      hint: '执行 /iazip 重新打包'
```

- `path` 相对于服务器根目录，也可以写绝对路径；可以自行添加更多目标。
- 同步时**只会替换云称号自己创建的文件夹**（里面有 `.cloudtitle-managed` 标记）。如果目标文件夹已存在但不是云称号创建的，会拒绝覆盖并在控制台提示，不会误删你的文件。

:::info 已在 ItemsAdder 4 实测
合并后 ItemsAdder 会把云称号的字体与自己的字体合并到同一个 `default.json`，两者互不影响。
:::

## 字符区与冲突

每一帧称号在资源包里都是一个字符。云称号默认从 **补充私用区 U+F0000** 开始分配，而 ItemsAdder 等插件常用 U+E000 – U+F8FF，因此不会抢占它们的字符。

```yaml title="config.yml"
resource-pack:
  glyph-start: 'F0000'   # 可选 E000 – F8FF 或 F0000 – FFFFD 范围内的起点
```

- 分配结果保存在 `glyphs.yml`，**重载后同一称号的字符保持不变**。
- 删除的称号会释放字符，之后新增的称号可以重复使用。

## 常见问题

**称号显示成方块？** 玩家没有加载最新资源包。确认资源包已发送，且修改图片后重新下发过。

**称号太高 / 太低 / 压到名字？** 调整称号的 `ascent`（垂直位置）或 `height`，见[显示字段](./frames.md#显示字段)。

**合并后 `/iazip` 没有称号？** 查看控制台是否出现「资源包已同步到 itemsadder」，并确认 `/clt reload` 在 `/iazip` 之前执行。
