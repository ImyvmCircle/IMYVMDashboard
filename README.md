# IMYVMDashboard

IMYVM Minecraft 服务器网页仪表盘。包含服务器景观和建筑展示、游戏 Wiki、服务器状态、玩家排行榜和玩家查询，另含有支持与社区申请入口等内容。

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

开发服务器默认运行在 `http://localhost:3000`。

本地查看效果时可以打开 `http://localhost:3000/dev/lab`。该页面是开发专用预览台，用于集中查看建筑卡片、Wiki 卡片、表单控件、空状态和错误态；生产环境默认不可访问。

## 验证

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Docker 部署

```bash
docker compose up -d --build
```

服务默认暴露 `3000:3000`。生产环境建议由 Nginx、Caddy 或现有反向代理转发 HTTPS 流量到该容器。

## 已预留接口

- `GET /api/health`：运行状态和当前数据源健康检查。
- `GET /api/server/summary`：服务器总览、建筑展示、Wiki、新闻、排行榜 mock 数据。
- `GET /api/players/:name`：玩家查询 mock 数据。
- `POST /api/submissions`：问题支持、社区申请 mock 提交。当前只做服务端校验并返回模拟工单号，不持久化。

## 配置

复制 `.env.example` 为 `.env.local` 后按需调整：

```bash
cp .env.example .env.local
```

当前支持的配置：

- `IMYVM_DATA_SOURCE=mock`：使用内置 mock 数据。后续接入插件 HTTP、地图标记、数据库或统计服务时，在 `src/lib/data-source/` 下新增 adapter。
- `NEXT_TELEMETRY_DISABLED=1`：关闭 Next.js telemetry。

## 待处理接入

项目目前通过 mock 数据和 API route 占位运行。后续为部署需要，应设计游戏源接入接口，例如插件 HTTP、地图标记、数据库、RCON 或统计服务。

1. 用真实 adapter 替换 `src/lib/mock-data.ts`，接入游戏内数据源。
4. 为提交类接口接入数据库、工单系统或 Discord/GitHub webhook。
5. 增加账号绑定和权限校验后，再开放敏感玩家数据或管理功能。
