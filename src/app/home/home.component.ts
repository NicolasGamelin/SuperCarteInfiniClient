import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatchService } from '../services/match.service';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7219/matchHub')
  .build();

  constructor(public router: Router, public match: MatchService) { }

  ngOnInit() {

  }

  async joinMatch(user1: boolean) {
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match
    
    //let matchId = -1;
    //this.router.navigate(['/match/' + matchId]);

    let userId:string = user1 ? "User1Id" : "User2Id";
    if(user1)
      localStorage.setItem("playerId", "1");
    else
      localStorage.setItem("playerId", "2");

    await this.connectToHub();
    
    this.hubConnection.invoke('joinMatch', userId);
  }

  async connectToHub(){
    await this.hubConnection
      .start()
      .then(() => {
          console.log('La connexion est active!');

          this.hubConnection!.on('joiningMatch', (data: any) => {
              console.log(data);
          })
        
          this.hubConnection!.on('UneAutreFonction', (data: any) => {
              console.log(data);
          })
      })
      .catch((err: any) => console.log('Error while starting connection: ' + err));
  }
}


