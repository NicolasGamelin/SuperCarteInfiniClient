import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../models/models";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{

  constructor(public api:ApiService) { }
  cards:Card[] = [];
  @Input() card?:Card;
  @Input() show:string = "front";
  @Input() health:number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";



 async ngOnInit() {
    this.cards = await this.api.getAllCards();
  }



}
