import { Player } from "./models";

export class playerRankDTO
{
  constructor(
    public players:Player[],
    public startRank:number
  ) {
  }
}