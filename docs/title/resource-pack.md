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

- **使用 ItemsAdder** —— 在 ItemsAdder 里[指定云称号的资源包路径](#itemsadder-指定路径推荐)（推荐），由 ItemsAdder 统一打包和发送。
- **使用 CraftEngine / Nexo** —— 使用下方的[自动同步](#自动同步)。
- **没有资源包插件** —— 把 `CloudTitle-pack.zip` 上传到网盘 / 对象存储 / 自建网页，在 `server.properties` 设置 `resource-pack=` 下载地址（建议同时填写 `resource-pack-sha1`）。

:::warning 修改图片后要重新下发
新增称号或修改图片后，资源包内容会改变，玩家需要重新下载资源包才会看到新图片（否则显示为方块）。
:::

## ItemsAdder 指定路径（推荐）

和 ModelEngine 的做法一样：让 ItemsAdder 打包时**直接读取**云称号生成的资源包文件夹，不需要复制文件。

<ol className="cc-steps">
<li>

**在 ItemsAdder 中加入云称号的路径**

打开 `plugins/ItemsAdder/config.yml`，找到 `resource-pack` → `zip` → `merge_other_plugins_resourcepacks_folders`，加入一行 `CloudTitle/resource_pack`：

```yaml title="plugins/ItemsAdder/config.yml"
resource-pack:
  zip:
    merge_other_plugins_resourcepacks_folders:
    - ModelEngine/resource pack
    - CloudTitle/resource_pack      # ← 加入这一行
```

路径相对于 `plugins/` 文件夹。如果你在云称号的 `config.yml` 改过 `resource-pack.output`，这里也要改成对应的文件夹名。

</li>
<li>

**关闭云称号对 ItemsAdder 的自动同步**

既然 ItemsAdder 会直接读取，就不需要再复制一份到 `contents/`：

```yaml title="plugins/CloudTitle/config.yml"
resource-pack:
  merge:
    itemsadder:
      enabled: false
```

如果之前已经同步过，可以删除 `plugins/ItemsAdder/contents/cloudtitle/` 文件夹，避免同一份内容被打包两次。

</li>
<li>

**生成并打包**

```text
/clt reload
/iazip
```

**顺序很重要**：先 `/clt reload` 生成（或更新）称号资源包，再 `/iazip` 让 ItemsAdder 打包。之后每次新增或修改称号图片，都按这个顺序执行一次。

</li>
</ol>

:::info 已在 ItemsAdder 4.0.17 实测
ItemsAdder 会把云称号的字体与自己的字体合并到同一个 `default.json`，两者互不影响；称号使用 U+F0000 起的字符，不会与 ItemsAdder 的字体图片冲突。
:::

:::tip 第一次安装
第一次启动时，ItemsAdder 可能在云称号生成资源包之前就完成打包。安装后执行一次 `/clt reload` 再 `/iazip` 即可。
:::

## 自动同步

不想修改 ItemsAdder 配置，或使用 CraftEngine / Nexo 时，可以让云称号在每次重载时把资源包**复制**到它们的资源目录：

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

使用 ItemsAdder 时，「指定路径」与「自动同步」**二选一**即可，不要同时开启。

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

**`/iazip` 之后没有称号？** 使用指定路径时，确认 `merge_other_plugins_resourcepacks_folders` 里写的是 `CloudTitle/resource_pack`，且该文件夹存在；使用自动同步时，查看控制台是否出现「资源包已同步到 itemsadder」。两种方式都要先 `/clt reload` 再 `/iazip`。
