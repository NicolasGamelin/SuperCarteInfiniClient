import { Component, OnInit } from '@angular/core';
import { Match, MatchData, Player, PlayerData } from '../models/models';
import { MatchService } from './../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { hubService } from '../services/hub.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchData:MatchData|null = null;

  public moneyForWin: Observable<number> = this.getMoneyForWin();
  public moneyForLose: Observable<number> = this.getMoneyForLose();

  constructor(private route: ActivatedRoute, public router: Router, public matchService:MatchService, public apiService:ApiService, public hubService: hubService) { }

  async ngOnInit() {
    let matchId:number  = parseInt(this.route.snapshot.params["id"]);
    // TODO Tâche Hub: Se connecter au Hub et obtenir le matchData
    // Test: À retirer une fois que le Hub est fonctionnel
    //await this.initTest();

    let match = await this.hubService.getmatchData(matchId)
    this.matchData = <MatchData>{}
    this.matchData.match = match
    this.matchData.playerA = <Player>{}
    this.matchData.playerA.id = this.matchData.match.playerDataA.id
    this.matchData.playerA.name = match.playerDataA.player.name

    this.matchData.playerB = <Player>{}
    this.matchData.playerB.id = this.matchData.match.playerDataB.id
    this.matchData.playerB.name = match.playerDataB.player.name
  }

  //async initTest() {
  //  // Pendant les tests, on est le joueur B
  //  let cards = await this.apiService.getPlayersCards();
  //  let matchData = this.matchService.playTestMatch(cards);
  //  console.log(cards.length);
  //  let nbCardsToDraw = 3;
  //  let drawCardEvents = this.createDrawCardEventsForTest(matchData.match.playerDataA, nbCardsToDraw);
  //  drawCardEvents = drawCardEvents.concat(this.createDrawCardEventsForTest(matchData.match.playerDataB, nbCardsToDraw + 1));
  //  drawCardEvents.push(
  //    {
  //      $type: "GainMana",
  //      Mana: 3,
  //      PlayerId: this.matchService.playerData?.playerId
  //    }
  //  );
//
  //  let fakeStartMatchEvent = {
  //    $type: "StartMatch",
  //    Events: drawCardEvents
  //  }
  //  this.matchService.applyEvent(fakeStartMatchEvent);
  //}

  createDrawCardEventsForTest(playerData:PlayerData, nbCards:number) : any[]{
    let drawCardEvents:any[] = [];
    for(let i = 0; i < nbCards; i++){
      drawCardEvents.push(
        {
          $type: "DrawCard",
          PlayerId: playerData.playerId,
          PlayableCardId: playerData.cardsPile[i].id
        }
      )
    }
    return drawCardEvents;
  }

  endMatch() {
    this.matchService.clearMatch();
    this.router.navigate(['/'])
  }

  async endTurn() {
    this.toggleIcon()
    await this.hubService.EndTurn(this.matchData?.match.id!, localStorage.getItem('username')!)
  }

  async surrender() {
    if (this.matchData!.playerA.name == localStorage.getItem('username')!){
      await this.hubService.Surrender(this.matchData?.match.id!, this.matchData!.match.playerDataA.playerId)
    }
    else{
      await this.hubService.Surrender(this.matchData?.match.id!, this.matchData!.match.playerDataB.playerId)
    }
  }


  isVictory() {
    if(this.matchService.matchData?.winningPlayerId)
      return this.matchService.matchData!.winningPlayerId === this.matchService.playerData!.playerId
    return false;
  }

  getMoneyForWin(): Observable<number>{
    return this.apiService.getMoneyForWin();
  }

  getMoneyForLose(): Observable<number>{
    return this.apiService.getMoneyForLose();
  }

  showIcon: boolean = false;

  toggleIcon() {
    this.showIcon = true;
    setTimeout(() => {
      this.showIcon = false;
    }, 2000); // L'icône est affichée pendant 2 secondes
  }
}
