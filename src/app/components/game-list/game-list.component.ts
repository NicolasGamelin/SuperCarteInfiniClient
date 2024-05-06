import {Component, OnInit} from '@angular/core';
import {MatchInfo} from "../../models/models";
import {hubService} from "../../services/hub.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  constructor(public hubService: hubService) {
  }


    matches:MatchInfo[] = [];
    async ngOnInit(): Promise<void> {
      this.matches = await this.hubService.GetMatches();
      console.log(this.matches);
    }

}
