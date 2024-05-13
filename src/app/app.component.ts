import { Component, OnInit } from '@angular/core';
import { MatchService } from './services/match.service';
import { Router } from '@angular/router';
import {ApiService} from "./services/api.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'supercartesinfinies';

  public money:Observable<number> = this.getMoney();
  public elo:number = 0;

  constructor(public router: Router, public matchService:MatchService,public service:ApiService) { 
    service.emitChangeSource.subscribe({
      next: (v) => {
        console.log(v);
        this.money = this.money;
        this.money = this.getMoney();
      },
      error: function (err: any): void {
        console.log(err);
      },
      complete: function (): void {
        
      }
    });
  }

  async ngOnInit() {
    this.elo = await this.getElo();
  }

  isLogged(){
    // TODO: Gérer l'affichage du joueur lorsqu'il est connecté
    return this.service.cookie.get(".AspNetCore.Identity.Application");

  }

  getUsername(){

    return this.service.GetUserName();
  }

  async logout() {
    // TODO: Gérer le logout
     await this.service.Logout()
  }

  getMoney(): Observable<number>{
    return this.service.getMoney();
  }

  async getElo(){
    return await this.service.getElo();
  }
}
