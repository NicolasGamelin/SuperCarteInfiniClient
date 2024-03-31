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
export class AppComponent {
  title = 'supercartesinfinies';

  public money:Observable<number> = this.getMoney();

  constructor(public router: Router, public matchService:MatchService,public service:ApiService) { }

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
}
