# 通用开发规范

执行每个任务，必须查看本文档是否有对应规则，并遵守。

## AI 执行纪律

执行任何任务时，以下纪律优先于一切：

1. **不确定就问，别猜** — 机制不明、需求模糊时，向操作者提问；不要为确认需求而终止对话。
2. **没要求的不写** — 仅实现 prompt 明确要求的内容。
3. **只改被要求的部分** — 不修改 prompt 未涉及的代码或文档。
4. **给验收标准，别给步骤** — 完成后说明结果是否满足预期，而非描述执行过程。

## 文档规则

1. **只描述事实。**只写当前架构如何，意在如何，应当如何使用。
2. **不做非必要建议。**只写接口用意，除非prompt明确指出，否则不假设应该添加什么。
3. **不描述冗余具体场景。**不要将prompt中偶然提及的任何与项目核心机制无关的环境场景当作金科玉律。环境设定要简洁必要。

## 内容规则

1. **不要模拟数据。**没有真实来源的数据不得编造、填充或单独建立模拟模块。
2. **没有就标暂无。**未接入、未提供或不存在的内容，在页面和接口响应中统一标为“暂无”或“没有”。
3. **文本集中管理。**页面展示文本、空状态、接口提示文本集中维护在 `src/resources/site-content.ts`。该文件只能包含真实已实现页面、通用 UI 文案和空状态，不写占位 URL、虚构资源、虚构统计或未实现功能的具体内容。
4. **资源集中管理。**视觉风格集中维护在 `src/resources/theme.css`；可提交的小型公开图片放在 `public/resources/`；大图片、下载包、外部归档资源不提交到 git。
5. **风格来源。**本项目的 Minecraft 视觉元素优先使用真实 Minecraft 贴图资源；像素质感、方块边框、木板/石质/草地方向的视觉元素统一在 `src/resources/theme.css` 中管理，不在页面组件中散写。

## 资源管理

1. **文本资源**：新增或修改页面文案时，先改 `src/resources/site-content.ts`，页面组件只引用该资源文件。
2. **风格资源**：新增或修改视觉 token、组件样式时，先改 `src/resources/theme.css`，页面组件只引用语义 class。
3. **图片与下载资源**：小型且必要的图片可放入 `public/resources/`。大型资源放入 `public/resources/external/`、`public/resources/downloads/` 或 `public/resources/packages/`，这些目录默认被 gitignore，只保留 `.gitkeep`。
4. **远程资源清单**：真实远程资源写入 `resources/remote-resources.json`。清单禁止写示例 URL、占位 URL 或无真实来源的资源。
5. **启动自动确保**：`predev`、`prebuild`、`prestart` 和 Docker 启动命令会运行 `scripts/ensure-resources.mjs`。远程资源缺失或校验不匹配时自动下载；清单为空时跳过。
6. **资源迁移包**：资源迁移包由 `pnpm resources:pack` 生成，包含 `src/resources`、`public/resources` 和 `resources/remote-resources.json`。迁移包必须包含已下载远程资源，导入时用 `pnpm resources:unpack -- <package>`。
7. **部署要求**：页面若引用被 gitignore 的远程资源，启动检查必须能下载到该资源；否则页面必须显示“暂无”，不得引用不存在的文件。
8. **Minecraft 贴图来源**：若页面要使用真实 Minecraft 图片，优先通过 `resources/minecraft-assets.json` 中列出的真实贴图路径，从用户自有的 Minecraft 资源目录或可用资源包解压目录导入到 `public/resources/minecraft/`。不得直接复制 Minecraft Wiki 图片到项目中。

## 迁移的同级项目规范

本项目迁移 IMYVMWorldGeo、WorldGeo-CommunityAddon、WorldGeo-AdventureAddon 等同级项目中适用于网页项目的通用规则：

1. **README 同步**：修改用户可见机制、资源入口、版本规则或本地运行方式时，同步更新 `README.md`。
2. **面向使用者写作**：文档以使用者可理解的行为、入口和限制为主，不暴露不必要实现细节。
3. **外部依赖校验**：涉及 IMYVM/WorldGeo 外部 API、发布制品或资源时，以已发布接口、版本号、资源清单为准；相邻目录源码只能作为参考，不能直接当作当前运行事实。
4. **集中配置与资源**：具体文本、风格、资源入口不散落在业务组件中。
5. **验证要求**：修改代码后运行本项目已有验证命令：`pnpm lint`、`pnpm typecheck`、`pnpm build`；涉及预览时确认本地页面可访问。

## 版本控制

1. **版本控制规则优先** — 涉及 git 操作时，本节规则优先于其他项目内开发规范。
2. **不主动使用 git** — 不使用 git，除非 prompt 明确要求。
3. **遵循现有格式** — 提交时遵循 git log 中已有的 commit 格式，采用同级项目常用 conventional commit：`feat:`、`fix:`、`docs:`、`chore:`、`refactor:`、`ci:`。IMYVM 扩展类型 `drop:` 用于明确移除功能或文件，`typo:` 用于纯文本拼写修正。
4. **不使用 co-author** — 提交信息不添加 Co-authored-by 等 trailer。
5. **版本源** — `package.json` 的 `version` 是本项目版本源，使用 SemVer：`MAJOR.MINOR.PATCH`。
6. **标签格式** — git tag 使用 `vMAJOR.MINOR.PATCH`，例如 `v0.1.0`。同级插件项目的 `v{Minecraft版本}-{模组版本}` 格式不迁移到本网页项目，因为本项目不是 Minecraft mod 制品。
7. **Changelog** — 版本变更记录写在 `README.md` 的 Changelog 段落。没有明确指示时，不主动新建版本、不更新版本号；需要发版时同步更新 `package.json` version、README Changelog 和 git tag。
