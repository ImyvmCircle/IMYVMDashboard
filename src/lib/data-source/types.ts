export type BuildPaletteBlock = {
  name: string;
  color: string;
};

export type BuildShowcaseItem = {
  name: string;
  status: string;
  location: string;
  builders: string[];
  description: string;
  palette: BuildPaletteBlock[];
};

export type WikiEntry = {
  title: string;
  icon: string;
  summary: string;
  tags: string[];
};

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  summary: string;
};

export type LeaderboardEntry = {
  name: string;
  title: string;
  score: string;
};

export type PlayerProfile = {
  name: string;
  rank: string;
  playtimeHours: number;
  lastSeen: string;
  favoriteProject: string;
  achievements: number;
};

export type ServerStatus = {
  onlinePlayers: number;
  maxPlayers: number;
  version: string;
  tps: number;
  recordedBuilds: number;
};

export type DashboardSummary = {
  source: string;
  serverStatus: ServerStatus;
  buildShowcase: BuildShowcaseItem[];
  wikiEntries: WikiEntry[];
  leaderboards: LeaderboardEntry[];
  newsItems: NewsItem[];
};

export type HealthStatus = {
  service: string;
  status: "ok";
  source: string;
  checkedAt: string;
  checks: {
    dataSource: "ok";
    buildShowcase: number;
    wikiEntries: number;
    leaderboards: number;
  };
};

export type DataSource = {
  getDashboardSummary: () => Promise<DashboardSummary>;
  getPlayerProfile: (name: string) => Promise<PlayerProfile | null>;
  getHealth: () => Promise<HealthStatus>;
};
