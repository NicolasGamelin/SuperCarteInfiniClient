import { Component, Input, OnInit } from '@angular/core';
import {MatchData, PlayableCard} from 'src/app/models/models';
import {hubService} from "../../services/hub.service";

@Component({
  selector: 'app-playerhand',
  templateUrl: './playerhand.component.html',
  styleUrls: ['./playerhand.component.css']
})
export class PlayerhandComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];
  @Input() matchData: MatchData | any;


  constructor(public hubService: hubService) { }

  ngOnInit() {
    console.log(this.cards)
  }

  async click(playableCardId: number| any) {
    // TODO: Utiliser seulement une fois que l'on peut jouer des cartes (TP2)

    if (this.matchData!.playerA.name == localStorage.getItem('username')!){
      await this.hubService.PlayCard(this.matchData?.match.id!,this.matchData!.match.playerDataB.playerId,playableCardId);
    }
    else{
      await this.hubService.PlayCard(this.matchData?.match.id!,this.matchData!.match.playerDataA.playerId,playableCardId);
    }



  }
}
