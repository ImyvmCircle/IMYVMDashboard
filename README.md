# IMYVMDashboard

IMYVM Minecraft 服务器网页仪表盘。首版重点是建筑展示、游戏 Wiki、服务器状态、玩家排行榜和玩家查询；支持与社区申请作为底部弱化入口保留。

当前项目不直接读取真实服务器数据，而是通过 mock 数据和 API route 占位运行。后续部署到 Minecraft Ubuntu 服务器后，应优先从游戏侧数据源接入，例如插件 HTTP、地图标记、数据库、RCON 或统计服务。

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

## 后续接入建议

1. 用真实 adapter 替换 `src/lib/mock-data.ts`，优先接入游戏内数据源。
2. 为建筑展示接入地图标记、地标登记或截图资源。
3. 为 Wiki 接入游戏内资料、配置导出或独立内容仓库。
4. 为提交类接口接入数据库、工单系统或 Discord/GitHub webhook。
5. 增加账号绑定和权限校验后，再开放敏感玩家数据或管理功能。
