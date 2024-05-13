import {Component, OnInit} from '@angular/core';
import {hubService} from "../../services/hub.service";
import {Message, Player} from "../../models/models";
import {MatchService} from "../../services/match.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements  OnInit{

  constructor(public hubService: hubService, public matchService:MatchService) {
  }

  ngOnInit(): void {
    this.hubService.hubConnection.on('showMessages', (data: Message) => {
      for (let i = 0; i < this.mutedPlayers.length;i++){
        if(data.playerName == this.mutedPlayers.at(i)){
          return
        }
      }
      this.messages.push(data);

    })
    }

  message:string = "";
  messages:Message[] = [];
  mutedPlayers:string[] = [];


  sendMessage(message:string, matchId:number){
    this.hubService.sendMessage(message,matchId);
  }

  mutePlayer(name:string){
    this.mutedPlayers.push(name);
  }

  banPlayer(name:string){
    this.hubService.banPlayer(name);
  }


}
