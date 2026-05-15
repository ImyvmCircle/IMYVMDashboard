---
applyTo: "README.md,src/**/*,public/resources/**/*,resources/**/*,package.json"
---

# 内容与资源规则

1. 不要模拟数据；没有真实来源的数据不得编造、填充或单独建立模拟模块。
2. 没有就标暂无；未接入、未提供或不存在的内容，在页面和接口响应中统一标为“暂无”或“没有”。
3. 页面展示文本、空状态和接口提示文本集中维护在 `src/resources/site-content.ts`。
4. 视觉风格集中维护在 `src/resources/theme.css`；页面组件只引用语义 class。
5. 小型且必要的公开图片放在 `public/resources/`。
6. 大图片、下载包、外部归档资源放在 `public/resources/external/`、`public/resources/downloads/` 或 `public/resources/packages/`，这些目录默认被 gitignore，只保留 `.gitkeep`。
7. 真实远程资源写入 `resources/remote-resources.json`，不得写示例 URL、占位 URL 或无真实来源的资源。
8. `predev`、`prebuild`、`prestart` 和 Docker 启动命令会运行 `scripts/ensure-resources.mjs`；远程资源缺失或校验不匹配时自动下载，清单为空时跳过。
9. 资源迁移包由 `pnpm resources:pack` 生成，包含 `src/resources`、`public/resources` 和 `resources/remote-resources.json`；导入时用 `pnpm resources:unpack -- <package>`。
10. 如果页面引用被 gitignore 的远程资源，启动检查必须能下载到该资源；否则页面必须显示“暂无”，不得引用不存在的文件。
11. 若页面要使用真实 Minecraft 图片，优先通过 `resources/minecraft-assets.json` 中列出的真实贴图路径，从用户自有的 Minecraft 资源目录或可用资源包解压目录导入到 `public/resources/minecraft/`。

