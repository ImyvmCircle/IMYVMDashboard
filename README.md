# IMYVMDashboard

IMYVM 服务器网页门户。包含资源模块、服务器状态、建筑档案、游戏资料、玩家数据、公告、支持与社区申请入口。未接入的数据在页面中显示为“暂无”。

## Changelog

### 0.1.0

- 建立 Next.js 网页门户基础结构。
- 删除模拟数据，未接入内容统一显示“暂无”。
- 建立版本管理、跨项目规范迁移和资源管理规则。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm
- Docker Compose

## 本地开发

```bash
corepack enable
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:3000`。启动前会自动检查远程资源；缺失时按 `resources/remote-resources.json` 下载，清单为空时跳过。

本地查看效果时可以打开 `http://localhost:3000/dev/lab`。该页面是开发专用预览台，用于集中查看建筑卡片、Wiki 卡片、表单控件、空状态和错误态；生产环境默认不可访问。

## 验证

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 版本管理

本项目参考同级 IMYVM/WorldGeo 项目的版本管理方法，但不迁移 Minecraft mod 的版本前缀。

- `package.json` 的 `version` 是本项目版本源，采用 SemVer：`MAJOR.MINOR.PATCH`。
- git tag 使用 `vMAJOR.MINOR.PATCH`，例如 `v0.1.0`。
- 发版时同步更新 `package.json` version、README Changelog 和 git tag。
- 提交信息采用同级项目常用格式：`feat:`、`fix:`、`docs:`、`chore:`、`refactor:`、`ci:`；IMYVM 扩展类型 `drop:` 用于移除功能或文件，`typo:` 用于纯文本拼写修正。
- 不主动执行 git 操作；提交时不添加 Co-authored-by trailer。

## 资源管理

项目资源分为文本、风格、小型公开资源、大型远程资源和可迁移资源包。可迁移资源包包含远程下载资源。

- 文本资源：`src/resources/site-content.ts`。页面展示文本、空状态、接口提示文本统一从这里读取。
- 风格资源：`src/resources/theme.css`。本项目优先使用真实 Minecraft 贴图资源，并在这里统一管理它们在网页中的使用方式。
- 小型公开资源：`public/resources/`。
- 大型资源：`public/resources/external/`、`public/resources/downloads/`、`public/resources/packages/`。上述目录默认被 gitignore，避免仓库膨胀。
- 远程资源清单：`resources/remote-resources.json`。清单写入真实资源 URL，不写示例 URL、占位 URL 或虚构资源。
- 资源迁移包：`resources/packages/`。打包产物默认被 gitignore，用于从其他环境迁移完整资源。
- Minecraft 贴图清单：`resources/minecraft-assets.json`。这里列出本项目识别为“真实 Minecraft 贴图”的标准资源。

启动自动检查资源：

- `pnpm dev`、`pnpm build`、`pnpm start` 会先运行 `scripts/ensure-resources.mjs`。
- Docker 镜像启动时会先运行 `node scripts/ensure-resources.mjs`，再启动 Next.js server。
- 远程资源不存在或 sha256 校验不匹配时会自动下载；清单为空时跳过。

手动确保或强制下载远程资源：

```bash
pnpm resources:ensure
pnpm resources:download
```

`resources:ensure` 补齐缺失或校验不匹配的资源；`resources:download` 会重新下载清单中的资源。页面引用被 gitignore 的资源前，启动检查需要能下载到该资源；没有资源时页面显示 `暂无`。

导入真实 Minecraft 贴图：

```bash
pnpm resources:import-minecraft -- <你的 Minecraft 版本 jar、资源目录或资源包解压目录>
```

当前识别并使用的真实 Minecraft 贴图为：

- `assets/minecraft/textures/block/grass_block_top.png`
- `assets/minecraft/textures/block/dirt.png`
- `assets/minecraft/textures/block/oak_planks.png`
- `assets/minecraft/textures/block/stone.png`
- `assets/minecraft/textures/block/cobblestone.png`
- `assets/minecraft/textures/block/deepslate.png`

上列贴图会被导入到 `public/resources/minecraft/block/`，并驱动首页与预览页的背景、面板、按钮、输入框和草地/泥土区域。

关于 Minecraft Wiki：我已核对其资源使用边界。Wiki 上的多数贴图和方块图像用于 wiki 展示，不应直接复制进本项目。因此本项目不直接从 Minecraft Wiki 拉取贴图文件，而是用它来确认资源名称和对应的真实游戏贴图，再从你自有的 Minecraft 资源目录或可用资源包中导入。

远程资源清单格式：

```json
{
  "resources": [
    {
      "id": "真实资源标识",
      "url": "https://真实资源地址",
      "target": "external/file-name.ext",
      "sha256": "可选的 64 位十六进制校验值"
    }
  ]
}
```

打包和导入完整资源：

```bash
pnpm resources:pack
pnpm resources:unpack -- resources/packages/imyvm-dashboard-resources.tar.gz
```

`resources:pack` 会先确保远程资源存在，再把 `src/resources`、`public/resources`、`resources/remote-resources.json` 和 `resources/minecraft-assets.json` 打包。该包可用于从其他环境迁移文本、风格、小型公开资源、已下载远程资源和已导入的 Minecraft 贴图。

## 迁移的同级项目规范

已迁移并适配到本网页项目的规则：

- README 同步：修改用户可见机制、资源入口、版本规则或本地运行方式时，同步更新 README。
- Changelog 同步：版本相关变更写入 README Changelog。
- 面向使用者写作：文档以使用者可理解的行为、入口和限制为主，不暴露不必要实现细节。
- 外部依赖校验：涉及 IMYVM/WorldGeo 外部 API、发布制品或资源时，以已发布接口、版本号、资源清单为准；相邻目录源码用于参考。
- 集中配置与资源：文本、风格、资源入口不散落在业务组件中。

## Docker 部署

```bash
docker compose up -d --build
```

服务默认暴露 `3000:3000`。生产环境建议由 Nginx、Caddy 或现有反向代理转发 HTTPS 流量到该容器。容器启动时会自动确保远程资源存在。

## 已预留接口

- `GET /api/health`：运行状态和当前数据源健康检查。
- `GET /api/server/summary`：服务器总览、资源、建筑档案、游戏资料、公告、排行榜数据。当前未接入数据源时返回空集合。
- `GET /api/players/:name`：玩家查询。当前未接入玩家资料时返回“暂无该玩家资料”。
- `POST /api/submissions`：问题支持、社区申请提交。当前未接入提交保存接口时返回“暂无提交保存接口”。

## 配置

复制 `.env.example` 为 `.env.local` 后按需调整：

```bash
cp .env.example .env.local
```

当前支持的配置：

- `NEXT_TELEMETRY_DISABLED=1`：关闭 Next.js telemetry。

## 待处理接入

项目当前没有接入服务器数据源。未接入内容在页面和接口中返回空集合、“暂无”或“没有”。

1. 接入游戏内数据源。
2. 为提交类接口接入数据库、工单系统或 Discord/GitHub webhook。
3. 增加账号绑定和权限校验后，再开放敏感玩家数据或管理功能。
