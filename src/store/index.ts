import create from "zustand";
import { persist } from "zustand/middleware";
export interface Metric {
  name: string;
  type: string;
}

export interface Leaderboard {
  id: number;
  name: string;
  metrics: Metric[];
  data: Record<string, any>[];
}

interface LeaderboardStore {
  leaderboards: Leaderboard[];
  addLeaderboard: (leaderboard: Leaderboard) => void;
}

export const useStore = create<LeaderboardStore>()(
  persist(
    (set) => ({
      leaderboards: [],
      addLeaderboard: (leaderboard) =>
        set((state) => ({
          leaderboards: [...state.leaderboards, leaderboard],
        })),
    }),
    { name: "leaderboard" }
  )
);
