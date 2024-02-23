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
        await this.hubConnection
          .start()
          .then(() => {
            console.log('La connexion est active!');

            this.hubConnection.on('matchData', (data: any) => {
                let matchData;
                data = JSON.parse(data)
                matchData = <MatchData>{}

                matchData.match = <Match>{}
                matchData.match.id = data.Id
                matchData.match.isMatchCompleted = data.WinnerUserId != null
                matchData.match.isPlayerATurn = data.IsPlayerATurn

                let playerdataa = <PlayerData>{}
                playerdataa.id = data.PlayerDataA.Id
                playerdataa.health = data.PlayerDataA.Health
                playerdataa.maxhealth = data.PlayerDataA.Health
                playerdataa.mana = data.PlayerDataA.Mana
                playerdataa.playerId = data.PlayerDataA.PlayerId
                playerdataa.playerName = data.PlayerDataA.Player.Name

                playerdataa.cardsPile = Array<PlayableCard>()

                data.PlayerDataA.CardsPile.forEach((card:any) => {
                    playerdataa.cardsPile.push(<PlayableCard>{})
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].id = card.Id
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].health = card.Health
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card = <Card>{}
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.id = card.Card.Id
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.name = card.Card.Name
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.attack = card.Card.Attack
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.defense = card.Card.Health
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.cost = card.Card.Cost
                    playerdataa.cardsPile[playerdataa.cardsPile.length-1].card.imageUrl = card.Card.ImageUrl
                });

                playerdataa.hand = data.PlayerDataA.Hand
                playerdataa.battleField = data.PlayerDataA.BattleField
                playerdataa.graveyard = data.PlayerDataA.Graveyard
                matchData.match.playerDataA = playerdataa

                let playerdatab = <PlayerData>{}
                playerdatab.id = data.PlayerDataB.Id
                playerdatab.health = data.PlayerDataB.Health
                playerdatab.maxhealth = data.PlayerDataB.Health
                playerdatab.mana = data.PlayerDataB.Mana
                playerdatab.playerId = data.PlayerDataB.PlayerId
                playerdatab.playerName = data.PlayerDataB.Player.Name

                playerdatab.cardsPile = Array<PlayableCard>()

                data.PlayerDataB.CardsPile.forEach((card:any) => {
                    playerdatab.cardsPile.push(<PlayableCard>{})
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].id = card.Id
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].health = card.Health
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card = <Card>{}
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.id = card.Card.Id
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.name = card.Card.Name
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.attack = card.Card.Attack
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.defense = card.Card.Health
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.cost = card.Card.Cost
                    playerdatab.cardsPile[playerdatab.cardsPile.length-1].card.imageUrl = card.Card.ImageUrl
                });

                playerdatab.hand = data.PlayerDataB.Hand
                playerdatab.battleField = data.PlayerDataB.BattleField
                playerdatab.graveyard = data.PlayerDataB.Graveyard
                matchData.match.playerDataB = playerdatab
                
                let playerA = <Player>{}
                playerA.id = data.PlayerDataA.Player.Id
                playerA.name = data.PlayerDataA.Player.Name
                matchData.playerA = playerA
                
                let playerB = <Player>{}
                playerB.id = data.PlayerDataB.Player.Id
                playerB.name = data.PlayerDataB.Player.Name
                matchData.playerB = playerB
                
                matchData.winningPlayerId = data.WinnerUserId
                
                this.matchService.playMatch(matchData, localStorage.getItem('playerId') as unknown as number)
            })

            this.hubConnection!.on('joiningMatch', (data: any) => {
                this.matchService.applyEvent(JSON.parse(data));
            })

            this.hubConnection!.on('EndTurn', (data: any) => {
                this.matchService.applyEvent(JSON.parse(data));
            })

            this.hubConnection!.on('Surrender', (data: any) => {
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

    async Surrender(matchId: number, userId: string){
        if (this.hubConnection.state == "Disconnected"){
            await this.connectToHub()
        }
        this.hubConnection.invoke('Surrender', matchId.toString(), userId.toString())
    }
}