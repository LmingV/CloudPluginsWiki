---
last_update:
  date: 2026-09-26
  author: CloudPlugins 团队
sidebar_position: 4
title: 开发者 API
description: 在其他插件中读取称号、发放称号，并监听称号变更事件。
---

# 开发者 API

聊天、TAB、活动、任务等插件可以通过 API 直接读取和修改称号，不必经过变量或指令。

## 引入

1. 把 `CloudTitle-1.0.0.jar` 加入编译依赖（仅编译期，`compileOnly`）。
2. 在你的 `plugin.yml` 中声明：

```yaml
softdepend: [CloudTitle]   # 或 depend
```

3. 使用前可用 `CloudTitleAPI.isReady()` 判断云称号是否已启用。

## 读取

```java
import dev.cloudplugins.title.api.CloudTitleAPI;

UUID id = player.getUniqueId();

String titleId = CloudTitleAPI.displayed(id);                // 正在显示的称号 ID（含默认称号），没有为 null
String chatGlyph = CloudTitleAPI.glyph(id, false, false);    // 大图首帧：聊天前缀用这个
String tabGlyph  = CloudTitleAPI.glyph(id, true, true);      // 小图、当前动画帧
List<String> hover = CloudTitleAPI.hoverLines(id);           // 悬停文本（config.yml chat.hover）

boolean has = CloudTitleAPI.owns(id, "vip");
Map<String, Long> owned = CloudTitleAPI.owned(id);           // 称号 ID → 到期时间（毫秒，0 = 永久）

CloudTitleAPI.title("vip").ifPresent(info -> {
    info.name();        // 带颜色的名称
    info.lore();        // 带颜色的 lore
    info.statLines();   // 按 stats.yml 格式化好的属性行
    info.animated();    // 是否为动态称号
});
```

| 方法 | 说明 |
| --- | --- |
| `titleIds()` | 全部已加载的称号 ID |
| `title(id)` | 称号信息 `TitleInfo`（名称、lore、属性行、是否动态、fps、是否出售） |
| `glyph(titleId, small, animated)` | 某个称号的字符（需要资源包） |
| `glyph(uuid, small, animated)` | 玩家正在显示的称号字符，没有返回空字符串 |
| `displayed(uuid)` / `equipped(uuid)` | 正在显示的称号（含默认称号）/ 玩家自己选择的称号 |
| `owns(uuid, id)` / `owned(uuid)` | 是否拥有 / 全部拥有的称号与到期时间 |
| `hoverLines(uuid)` | 悬停文本行 |
| `openShowcase(viewer, targetUuid)` | 为 viewer 打开 target 的称号展示界面（target 可离线） |

读取类方法只针对**在线玩家**，并且线程安全、几乎零开销，可以在聊天事件等任何线程中调用。

## 修改

修改类方法对**在线或离线**玩家都有效，返回 `CompletableFuture<Boolean>`，在云称号的数据库线程完成：

```java
CloudTitleAPI.give(uuid, "vip", 7L * 86_400_000L, "api:MyPlugin")   // 7 天；0 = 永久
    .thenAccept(ok -> getLogger().info("发放结果：" + ok));

CloudTitleAPI.take(uuid, "vip", "api:MyPlugin");
CloudTitleAPI.equip(uuid, "vip");      // 需已拥有，不受切换冷却限制
CloudTitleAPI.unequip(uuid);
```

`source` 会写入操作日志，建议使用 `api:插件名`。

:::warning 回调线程
回调在数据库线程执行。如果要操作玩家、背包或世界，请先切回玩家所在线程（Folia 使用 `player.getScheduler()`）。
:::

## 事件

事件都在变更**保存之后**触发，通常是异步事件（`isAsynchronous()` 为 true）。

| 事件 | 触发时机 | 主要方法 |
| --- | --- | --- |
| `TitleObtainEvent` | 获得称号，或限时称号续期 | `getTitleId()` `getDurationMs()` `isExtended()` `getSource()` |
| `TitleRemoveEvent` | 称号被收回或到期 | `getTitleId()` `isExpired()` `getSource()` |
| `TitleEquipEvent` | 佩戴、切换或卸下称号 | `getTitleId()`（卸下时为 null）`getPreviousTitleId()` `isUnequip()` |

所有事件都有 `getPlayerId()` 与 `getPlayer()`（不在线时为 null）。

```java
@EventHandler
public void onEquip(TitleEquipEvent e) {
    // 例如：刷新聊天插件缓存的称号前缀
    String prefix = CloudTitleAPI.glyph(e.getPlayerId(), false, false);
}
```

- 正在佩戴的称号被收回或到期时，只会触发 `TitleRemoveEvent`（玩家随之变为未佩戴）。
- 跨服同步带来的变更（其他服务器修改的）不会在本服重复触发事件。

## 与聊天插件整合

聊天里的称号只能是**静态**的（消息发出后不会更新），推荐做法：

1. 消息前缀使用 `CloudTitleAPI.glyph(uuid, false, false)`（或小图 `true, false`）。
2. 悬停文本使用 `CloudTitleAPI.hoverLines(uuid)`。
3. 点击称号时调用 `CloudTitleAPI.openShowcase(viewer, uuid)` 查看对方拥有的称号，或让点击执行 `/clt showcase <玩家>`。

不写代码的聊天插件也可以直接使用变量 `%clt_use_static%` 与 `%clt_use_hover%`，见[变量](./placeholders.md)。
