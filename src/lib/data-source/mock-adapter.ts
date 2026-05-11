import {
  buildShowcase,
  leaderboards,
  newsItems,
  players,
  serverStatus,
  wikiEntries,
} from "@/lib/mock-data";
import type { DataSource } from "./types";

export const mockDataSource: DataSource = {
  async getDashboardSummary() {
    return {
      source: "game-mock",
      serverStatus,
      buildShowcase,
      wikiEntries,
      leaderboards,
      newsItems,
    };
  },

  async getPlayerProfile(name) {
    const normalizedName = name.trim().toLowerCase();
    return players.find((candidate) => candidate.name.toLowerCase() === normalizedName) ?? null;
  },

  async getHealth() {
    return {
      service: "imyvm-dashboard",
      status: "ok",
      source: "game-mock",
      checkedAt: new Date().toISOString(),
      checks: {
        dataSource: "ok",
        buildShowcase: buildShowcase.length,
        wikiEntries: wikiEntries.length,
        leaderboards: leaderboards.length,
      },
    };
  },
};
