# IMYVMDashboard

IMYVM Minecraft 服务器网页门户。包含资源模块、服务器状态、建筑档案、游戏资料、玩家数据、公告、支持与社区申请入口。未接入的数据在页面中显示为“暂无”。

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
