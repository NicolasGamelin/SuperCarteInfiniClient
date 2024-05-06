import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Card, Deck, OwnedCard} from "../../models/models";
import {Deckname} from "../../models/Deckname";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{





  cards:OwnedCard[] = [];
  isActive:boolean = false;
  selectedDeckID:number = 0;
  selectedCardID:number = 0;
  decklist:Deck[] = [];
  name:string = "";
chart : any;

  StatByRarity: any[] = [];
  d: {y: number, rarity: number}[] = [];

  deckname:Deckname = new Deckname("");
  selectedDeck:Deck | undefined;

  constructor(public service:ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.decklist = await this.service.getAllDecks();

  this.StatByRarity = await  this.service.StatByRarity(0);

   this.StatByRarity.forEach(e => {
     this.d.push({y : e.count, rarity: e.rarity});
   });
    console.log(this.d);
    this.updateChart(0)

    }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart(0);
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "statistique par rareté de la carte "
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{y}: {rarity}",
      yValueFormatString: "#,###.##''",
      dataPoints:[{}]
    }]
  }





  async createDeck(name:string){
    this.deckname.name = name;
    let deck:Deck | null;
    console.log(name);
    deck = await this.service.createDeck(this.deckname );
    if(deck != null)
    this.decklist.push(deck);

  }

  async deleteDeck(){
    let ID:number = this.selectedDeckID;
    await this.service.deleteDeck(ID );
    this.selectedDeckID = 0;
   this.decklist = await this.service.getAllDecks();
  }

  async setDeckAsActive(){
    await this.service.SetDeckAsActive(this.selectedDeckID);
    this.decklist = await this.service.getAllDecks();
    await this.selectDeck();
  }


  async selectDeck(){
      let decks:Deck[] = this.decklist;
    for (let i:number = 0; i < decks.length;i++ ) {
      if(decks.at(i)?.id == this.selectedDeckID){
        this.selectedDeck = decks.at(i)!;
        this.isActive = decks.at(i)!.isActive;
        this.cards = await this.service.GetOwnedCards(this.selectedDeckID);
      }
    }

  }

  async addCard(){
    let card:OwnedCard = await this.service.addCard(this.selectedDeckID,this.selectedCardID);
    this.selectedCardID = 0;
    this.selectedDeck?.cards.push(card);
    for (let i:number = 0; i < this.cards.length;i++){
      if (card.id == this.cards.at(i)!.id){
        this.cards.splice(i,1);
      }
    }
  }

  async removeCard(cardID:number){
   let card:OwnedCard = await this.service.RemoveCard(this.selectedDeckID,cardID);
   this.cards.push(card);
    for (let i:number = 0; i < this.selectedDeck?.cards!.length!; i++){
      if (card.id == this.selectedDeck?.cards.at(i)!.id){
        this.selectedDeck?.cards.splice(i,1);
      }
    }
  }

  async  updateChart(id : number){

    this.chartOptions.data[0].dataPoints = this.d;
this.chart.render();

  }

}
