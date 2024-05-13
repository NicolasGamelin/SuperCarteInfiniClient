import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {hubService} from "../../services/hub.service";
import {MatchService} from "../../services/match.service";

@Component({
  selector: 'app-spechand',
  templateUrl: './spechand.component.html',
  styleUrls: ['./spechand.component.css']
})
export class SpechandComponent {

  constructor(public router:Router, public hub:hubService, public matchService:MatchService) {  }


  quitter(){
    this.hub.leave()
  }

  changerPerspective(){
    this.hub.hubConnection.invoke("ChangePerspective",this.matchService.match?.id!, this.hub.perspective);

    if(this.hub.perspective == 0)
      this.hub.perspective = 1;
    else
      this.hub.perspective = 0;
  }

}
