---
sidebar_position: 1
---

# 快速开始

欢迎来到 **CloudPlugins 官方 Wiki**。这里是 CloudCosmetics、CloudChat 及后续云系列插件的统一文档入口，面向服务器服主、管理员与开发者。

## 01 · 安装插件

1. 确认服务端运行环境与当前插件版本要求一致。
2. 将对应的 `.jar` 文件放入服务端的 `plugins/` 目录。
3. 重启服务端，检查控制台是否出现 CloudPlugins 的加载信息。
4. 进入服务器执行插件提供的帮助命令，确认权限与功能已生效。

> 建议在升级前备份 `plugins/` 目录中的配置文件。跨大版本升级时，请先阅读对应插件的更新说明。

## 02 · 选择插件文档

- [CloudCosmetics 云时装](./cosmetics/index.mdx)：ModelEngine 模型时装、时装卡、商城与永久 BUFF。
- [CloudChat](./chat)：聊天频道、格式化消息与权限控制能力。

## 03 · 配置与排错

插件首次启动后，配置文件会写入各自的插件目录。修改配置后请按文档要求重载或重启服务端；如果功能没有生效，优先检查版本、权限节点和控制台报错。

## 文档约定

文档中的命令、权限节点和配置键使用等宽字体标记。示例值用于说明结构，生产环境请根据你的服务端版本和实际需求调整。

## 获取支持

你可以在 [GitHub](https://github.com/LmingV/CloudPlugins.github.io) 提交问题与改进建议，也可以加入[官方交流群](https://qm.qq.com/q/qjKEhFUF0I) 获取社区支持。
