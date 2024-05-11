import {Component, OnInit} from '@angular/core';
import {MatchInfo} from "../../models/models";
import {hubService} from "../../services/hub.service";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  constructor(public service: ApiService, public hubService: hubService,public router: Router) {
  }


    matches:MatchInfo[] = [];
    async ngOnInit(): Promise<void> {
      this.matches = await this.service.GetMatches();
      console.log(this.matches);
    }

  async joinMatch(matchid:number) {

      let userId:string = localStorage.getItem("username")!;

    this.hubService.hubConnection.invoke('Spectate', userId, matchid);

    this.hubService.hubConnection.on('redirectToMatch', (data: any) => {
      this.router.navigateByUrl('/match/'+data)
    })
  }

}
