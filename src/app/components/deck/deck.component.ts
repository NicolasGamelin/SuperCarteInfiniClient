import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Deck} from "../../models/models";
import {deckname} from "../../models/Deckname";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{

  decklist:Deck[] = [];
  name:string = "";
  deckname:deckname = new deckname("");
  constructor(public service:ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.decklist = await this.service.getAllDecks();
    }

 async createDeck(name:string){
    this.deckname.name = name;
    let deck:Deck | null;
    console.log(name);
    deck = await this.service.createDeck(deckname );
    if(deck != null)
    this.decklist.push(deck);
  }

}
