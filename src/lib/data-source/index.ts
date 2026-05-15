import type { DataSource } from "./types";

export const dataSource: DataSource = {
  async getDashboardSummary() {
    return {
      source: "none",
      serverStatus: {
        onlinePlayers: null,
        maxPlayers: null,
        version: null,
        tps: null,
        recordedBuilds: null,
      },
      buildShowcase: [],
      wikiEntries: [],
      leaderboards: [],
      newsItems: [],
      resources: [],
    };
  },

  async getPlayerProfile() {
    return null;
  },

  async getHealth() {
    return {
      service: "imyvm-dashboard",
      status: "ok",
      source: "none",
      checkedAt: new Date().toISOString(),
      checks: {
        dataSource: "ok",
        buildShowcase: 0,
        wikiEntries: 0,
        leaderboards: 0,
        resources: 0,
      },
    };
  },
};
