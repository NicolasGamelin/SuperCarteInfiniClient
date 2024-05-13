import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as signalR from "@microsoft/signalr";
import { Card, Match, MatchData, PlayableCard, Player, PlayerData, MatchInfo } from "../models/models";
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

   perspective:number = 0;

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
            this.hubConnection.on("notifyPLayers", (data: string) => {
              alert(data + " regarde la partie");
              this.matchService.players.push(data)
            })
            this.hubConnection.on("forceLeave", (data: any) => {
              alert("Vous avez été banni de cette partie");
              this.router.navigateByUrl('/');
            })
            this.hubConnection.on("leaving", (data: string) => {
              this.matchService.removePlayer(data);
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

  async sendMessage(message:string, matchId:number){
      let userId:string = localStorage.getItem("username")!;
    if (this.hubConnection.state == "Disconnected"){
      await this.connectToHub()
    }
    this.hubConnection.invoke('SendMessage', message, userId, matchId);
  }

  async banPlayer(name:string){
    if (this.hubConnection.state == "Disconnected"){
      await this.connectToHub()
    }
    this.hubConnection.invoke('BanPlayer', name,this.matchService.match?.id);
    this.matchService.removePlayer(name);
  }

  async leave(){
    this.hubConnection.invoke("Leave",this.matchService.match?.id!, localStorage.getItem('username')!)
    this.router.navigateByUrl('/');
  }




}
