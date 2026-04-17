export interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
}

export interface DiceRollStats {
  rolls: number;
  wins: number;
  lastTarget: number;
  lastRoll: number;
  winRate: number;
}

export interface CeloDiceRollConfig {
  contractAddress: string;
  rpcUrl?: string;
}
