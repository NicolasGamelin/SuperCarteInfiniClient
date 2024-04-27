import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Card, Paquet } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-paquet',
  templateUrl: './paquet.component.html',
  styleUrls: ['./paquet.component.css']
})
export class PaquetComponent {
  @Input() paquet?:Paquet;
  public cardsToShow: Card[] = new Array<Card>();
  public show:string = "back";

  constructor(public service:ApiService){}

  async buy(){
    let money = await this.getMoney();
    if( money >= this.paquet!.cout){
      this.cardsToShow = await this.service.buyPaquet(this.paquet!.id);
    }
    this.service.emitChange("money");
  }

  async getMoney(): Promise<number>{
    return await firstValueFrom(this.service.getMoney())
  }

  quit(){
    this.cardsToShow = new Array<Card>();
    this.show = "back";
  }

  showAll(){
    this.show = "front"
  }
}
