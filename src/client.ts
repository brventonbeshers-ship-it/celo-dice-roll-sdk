import { ethers } from "ethers";
import { CeloDiceRollConfig, DiceRollStats, LeaderboardEntry } from "./types";

const ABI = [
  "function roll(uint256 target) external",
  "function totalRolls() external view returns (uint256)",
  "function userRolls(address) external view returns (uint256)",
  "function userWins(address) external view returns (uint256)",
  "function getUserStats(address player) external view returns (uint256 rolls, uint256 wins, uint256 latestTarget, uint256 latestRoll)",
  "function getLeaderboard() external view returns (address[10], uint256[10])",
];

export class CeloDiceRollClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  public contractAddress: string;

  constructor(config: CeloDiceRollConfig) {
    const rpcUrl = config.rpcUrl || "https://forno.celo.org";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contractAddress = config.contractAddress;
    this.contract = new ethers.Contract(config.contractAddress, ABI, this.provider);
  }

  async getTotalRolls(): Promise<number> {
    const total = await this.contract.totalRolls();
    return Number(total);
  }

  async getUserStats(address: string): Promise<DiceRollStats> {
    const [rolls, wins, lastTarget, lastRoll] = await this.contract.getUserStats(address);
    const rollCount = Number(rolls);
    const winCount = Number(wins);
    return {
      rolls: rollCount,
      wins: winCount,
      lastTarget: Number(lastTarget),
      lastRoll: Number(lastRoll),
      winRate: rollCount === 0 ? 0 : Math.round((winCount / rollCount) * 100),
    };
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const [addresses, scores] = await this.contract.getLeaderboard();
    const entries: LeaderboardEntry[] = [];

    for (let i = 0; i < 10; i++) {
      const address = addresses[i];
      const score = Number(scores[i]);
      if (address !== ethers.ZeroAddress && score > 0) {
        entries.push({ address, score, rank: i + 1 });
      }
    }

    return entries;
  }
}

export { ABI as CELO_DICE_ROLL_ABI };
