import { Component } from '@angular/core';
import { MatchService } from './services/match.service';
import { Router } from '@angular/router';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supercartesinfinies';

  constructor(public router: Router, public matchService:MatchService,public service:ApiService) { }

  isLogged(){
    // TODO: Gérer l'affichage du joueur lorsqu'il est connecté

    return true;
  }

  getUsername(){
    return "USERNAME";
  }

  async logout() {
    // TODO: Gérer le logout
this.service.Logout()
  }

}
