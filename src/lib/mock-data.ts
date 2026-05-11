export type SupportLink = {
  title: string;
  description: string;
};

export const serverStatus = {
  onlinePlayers: 38,
  maxPlayers: 120,
  version: "1.21.x",
  tps: 19.8,
  recordedBuilds: 24,
};

export const buildShowcase = [
  {
    name: "中央主城穹顶",
    status: "重点展示",
    location: "world / 0, 78, 0",
    builders: ["Doohaey", "OakBuilder"],
    description: "作为服务器空间记忆的入口建筑，后续可从游戏内地标登记、BlueMap 标记或数据库同步真实资料。",
    palette: [
      { name: "stone_bricks", color: "#7f7f7f" },
      { name: "dark_oak_planks", color: "#4b2f1b" },
      { name: "copper_block", color: "#b66f3b" },
      { name: "oxidized_copper", color: "#5ea596" },
      { name: "glowstone", color: "#d9b45f" },
      { name: "moss_block", color: "#596f2f" },
      { name: "deepslate", color: "#343434" },
      { name: "glass", color: "#9bd0d9" },
      { name: "spruce_planks", color: "#75512d" },
      { name: "lantern", color: "#f2c66d" },
    ],
  },
  {
    name: "北境交通塔",
    status: "已归档",
    location: "world / -320, 92, 460",
    builders: ["MapRunner"],
    description: "连接北境道路、地下铁路和后续地图入口的交通节点。",
    palette: [],
  },
  {
    name: "红石能源站",
    status: "维护中",
    location: "world_nether / 88, 64, -140",
    builders: ["RedstoneFox"],
    description: "展示红石机械、产线状态和未来自动化统计的资料入口。",
    palette: [],
  },
  {
    name: "湖畔档案馆",
    status: "规划中",
    location: "world / 512, 70, 128",
    builders: ["AlexCraft", "OakBuilder"],
    description: "计划承载服务器历史、建筑日志和社区 Wiki 的游戏内建筑。",
    palette: [],
  },
];

export const wikiEntries = [
  {
    title: "新玩家指南",
    icon: "书",
    summary: "整理入服后的基础命令、领地、经济、交通和常见问题，后续从游戏内 Wiki 或配置同步。",
    tags: ["指南", "命令", "规则"],
  },
  {
    title: "建筑与地标",
    icon: "图",
    summary: "记录地标坐标、建造者、建筑状态、历史版本和可公开展示的截图资料。",
    tags: ["建筑", "坐标", "历史"],
  },
  {
    title: "系统机制",
    icon: "石",
    summary: "说明经济、活动、世界地理、公告和其他服务器插件机制。",
    tags: ["机制", "插件", "数据"],
  },
];

export const newsItems = [
  {
    date: "2026-05-11",
    category: "开发中",
    title: "IMYVM Dashboard 项目启动",
    summary: "建筑展示、游戏 Wiki、玩家查询和排行榜已开始搭建，当前使用 mock 数据等待服务器接口接入。",
  },
  {
    date: "近期",
    category: "接口计划",
    title: "优先读取游戏内数据",
    summary: "后续优先从插件 HTTP、数据库、地图标记或统计服务同步建筑、Wiki 和玩家资料。",
  },
  {
    date: "后续",
    category: "社区",
    title: "支持与申请流程将接入持久化",
    summary: "底部提交入口首版只校验并模拟接收，等部署环境和审核流程确定后再接入数据库或工单系统。",
  },
];

export const leaderboards = [
  { name: "Doohaey", title: "档案管理员", score: "12,840" },
  { name: "AlexCraft", title: "地标收藏家", score: "10,420" },
  { name: "RedstoneFox", title: "红石维护员", score: "9,775" },
  { name: "OakBuilder", title: "建筑大师", score: "8,930" },
  { name: "MapRunner", title: "探索者", score: "7,610" },
];

export const players = [
  {
    name: "Doohaey",
    rank: "Owner",
    playtimeHours: 1680,
    lastSeen: "刚刚在线",
    favoriteProject: "中央主城穹顶",
    achievements: 142,
  },
  {
    name: "AlexCraft",
    rank: "VIP",
    playtimeHours: 920,
    lastSeen: "2 小时前",
    favoriteProject: "湖畔档案馆",
    achievements: 98,
  },
  {
    name: "RedstoneFox",
    rank: "Member",
    playtimeHours: 740,
    lastSeen: "昨天",
    favoriteProject: "红石能源站",
    achievements: 87,
  },
];

export const supportLinks: SupportLink[] = [
  {
    title: "问题支持",
    description: "反馈登录、物品、权限或服务器异常。",
  },
  {
    title: "社区申请",
    description: "用于后续志愿者、建筑协作、资料维护等申请。",
  },
];
