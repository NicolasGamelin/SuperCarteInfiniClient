import {Component, OnInit} from '@angular/core';
import {hubService} from "../../services/hub.service";
import {Message} from "../../models/models";
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
      this.messages.push(data);
    })
    }

  message:string = "";
  messages:Message[] = [];

  sendMessage(message:string, matchId:number){
    this.hubService.sendMessage(message,matchId);
  }

}
