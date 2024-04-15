import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Card, CardPower} from 'src/app/models/models';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ApiService} from "../../services/api.service";
import {hubService} from "../../services/hub.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Card[] = [];
  cardPowerr: CardPower[] = [];
  bounce = false;
  @Input() card?: Card;
  @Input() show: string = "front";
  @Input() health: number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";

  constructor(public http:HttpClient, public api:ApiService, public hubService: hubService) {

  }

  async ngOnInit() {
    this.cards = await this.api.getPlayersCards();
    this.cardPowerr = await this.api.getCardsPower();



  }


  turn() {
    this.show = "front";
  }

  bouncingPowers: any[] = []; // Définir un tableau pour stocker les pouvoirs en cours d'animation

  isBouncing(cardpower: any): boolean {
    return this.bouncingPowers.includes(cardpower);
  }

  bounceMe(cardpower: any) {
    if (!this.isBouncing(cardpower)) {
      this.bouncingPowers.push(cardpower);
      setTimeout(() => {
        this.bouncingPowers = this.bouncingPowers.filter(power => power !== cardpower);
      }, 1000 * this.bouncingPowers.length);
    }
  }





}
