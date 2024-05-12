import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-victory-lose',
  templateUrl: './victory-lose.component.html',
  styleUrls: ['./victory-lose.component.css']
})
export class VictoryLoseComponent implements  OnInit, OnChanges{
  @Input() selectedDeckID!: number;
  Victoire : number  = 0;
  Defaite : number  = 0;
  Stat:any;

constructor(public ServiceApi: ApiService) {}
  async ngOnInit() {

    this.Stat = await this.ServiceApi.victoryAndLose(this.selectedDeckID);
    this.Victoire = this.Stat.victoire
    this.Defaite = this.Stat.defaite
  }
  async ngOnChanges() {

    this.Stat = await this.ServiceApi.victoryAndLose(this.selectedDeckID);
    this.Victoire = this.Stat.victoire
    this.Defaite = this.Stat.defaite
  }
}
