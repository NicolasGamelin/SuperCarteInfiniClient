import {Component, OnChanges, OnInit} from '@angular/core';
import {Deck} from "../../models/models";
import {ApiService} from "../../services/api.service";
import {ThisReceiver} from "@angular/compiler";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit, OnChanges{
  selectedDeckID:number = 0;
  decklist:Deck[] = [];
  selectedDeck:Deck | undefined;
  Stat:any;
Victoire : number  = 0;
Defaite : number  = 0;
  constructor(public ServiceApi: ApiService) {
  }





  async ngOnInit() {
    this.decklist = await this.ServiceApi.getAllDecks();
this.Stat = await this.ServiceApi.victoryAndLose(this.selectedDeckID);
this.Victoire = this.Stat.victoire
this.Defaite = this.Stat.defaite
  }
  async ngOnChanges() {
    this.decklist = await this.ServiceApi.getAllDecks();
    this.Stat = await this.ServiceApi.victoryAndLose(this.selectedDeckID);
    this.Victoire = this.Stat.victoire
    this.Defaite = this.Stat.Defaite
  }

  async selectDeck(){
    let decks:Deck[] = this.decklist;
    for (let i:number = 0; i < decks.length;i++ ) {
      if(decks.at(i)?.id == this.selectedDeckID){
        this.selectedDeck = decks.at(i)!;
      }
    }

  }

  protected readonly ThisReceiver = ThisReceiver;
}
