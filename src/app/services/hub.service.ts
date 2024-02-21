import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as signalR from "@microsoft/signalr";

@Injectable({
    providedIn: 'root'
  })
export class hubService {
    public hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7219/matchHub')
    .build();

    constructor(public router: Router) {}

    async connectToHub(){
        await this.hubConnection
          .start()
          .then(() => {
              console.log('La connexion est active!');
          })
          .catch((err: any) => console.log('Error while starting connection: ' + err));
    }

    joinMatch(userId: string){
        this.hubConnection.invoke('joinMatch', userId);
    }
}