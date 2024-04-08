import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Deck} from "../../models/models";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{

  decklist:Deck[] = [];
  name:string = "";
  constructor(public service:ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.decklist = await this.service.getAllDecks();
    }

 async createDeck(name:string){
    let deck:Deck | null;
    console.log(name);
    deck = await this.service.createDeck(name );
    if(deck != null)
    this.decklist.push(deck);
  }

}
