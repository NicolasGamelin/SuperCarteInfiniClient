import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../models/models";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{

  cards:Card[] = [];
  @Input() card?:Card;
  @Input() show:string = "front";
  @Input() health:number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";

  constructor(public http:HttpClient) { }

  ngOnInit() {
    this.getPlayerCards();
  }


  async getPlayerCards(){
    let res = await lastValueFrom(this.http.get<Card[]>('http://localhost:5057/api/Card/GetAllCards'));
    this.cards = res;
    console.log(res);
  }
}
