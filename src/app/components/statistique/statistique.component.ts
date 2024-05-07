import {Component, OnInit} from '@angular/core';
import {Deck} from "../../models/models";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit{
  selectedDeckID:number = 0;
  decklist:Deck[] = [];
  selectedDeck:Deck | undefined;

  constructor(public ServiceApi: ApiService) {
  }





  async ngOnInit() {
    this.decklist = await this.ServiceApi.getAllDecks();
  }

  async selectDeck(){
    let decks:Deck[] = this.decklist;
    for (let i:number = 0; i < decks.length;i++ ) {
      if(decks.at(i)?.id == this.selectedDeckID){
        this.selectedDeck = decks.at(i)!;
      }
    }

  }

}
