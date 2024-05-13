import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as signalR from "@microsoft/signalr";
import { Card, Match, MatchData, PlayableCard, Player, PlayerData } from "../models/models";
import { MatchService } from "./match.service";

@Injectable({
    providedIn: 'root'
})
export class hubService {
    public hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7219/matchHub')
        .withAutomaticReconnect()
        .build();

    constructor(public router: Router, public matchService: MatchService) {}

    async connectToHub(){
        this.hubConnection.onreconnecting((error?: Error) => {
            console.log("Hub connection lost, reconnecting...");
        })

        await this.hubConnection
          .start()
          .then(() => {
            console.log('La connexion est active!');

            this.hubConnection.on('matchData', (data: MatchData) => {
                if (data.playerA.name == localStorage.getItem('username')!){
                    this.matchService.playMatch(data, data.playerA.id)
                }
                else{
                    this.matchService.playMatch(data, data.playerB.id)
                }
            })

            this.hubConnection.on("event", (data: any) => {
                console.log("Event :\n"+data)
                this.matchService.applyEvent(JSON.parse(data));
            })
          })
          .catch((err: any) => console.log('Error while starting connection: ' + err));
    }

    async joinMatch(userId: string, matchId: number|null){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        this.hubConnection.invoke('joinMatch', userId, matchId);
    }

    async getmatchData(matchId: number){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        return this.hubConnection.invoke('getMatchData', matchId)
    }

    async EndTurn(matchId: number, userId: string){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        this.hubConnection.invoke('EndTurn', matchId.toString(), userId.toString())
    }

  async PlayCard(matchId: any, userId: any, playableCardId:any){
    if (this.hubConnection.state == "Disconnected"){
      await this.connectToHub()
    }
    this.hubConnection.invoke('PlayCard', matchId.toString(), userId.toString(), playableCardId.toString())
  }

    async Surrender(matchId: number, userId: number){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        this.hubConnection.invoke('Surrender', matchId.toString(), userId.toString())
    }

    async stopSearch(userid: string){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        this.hubConnection.invoke('stopSearch', userid)
    }
}
