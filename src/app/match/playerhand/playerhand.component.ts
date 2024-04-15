import { Component, Input, OnInit } from '@angular/core';
import { PlayableCard } from 'src/app/models/models';
import {hubService} from "../../services/hub.service";

@Component({
  selector: 'app-playerhand',
  templateUrl: './playerhand.component.html',
  styleUrls: ['./playerhand.component.css']
})
export class PlayerhandComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];
  @Input() matchId: any;
  @Input() userId: any;

  constructor(public hubService: hubService) { }

  ngOnInit() {
    console.log(this.cards)
  }

  async click(playableCardId: any) {
    // TODO: Utiliser seulement une fois que l'on peut jouer des cartes (TP2)


    await this.hubService.PlayCard(this.matchId,this.userId,playableCardId);


  }
}
