import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/models';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards:Card[] = [];
  @Input() card?:Card;
  @Input() show:string = "front";
  @Input() health:number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";

  constructor(public http:HttpClient, public api:ApiService) {

  }

  async ngOnInit() {
    this.cards = await this.api.getPlayersCards();
  }



}
