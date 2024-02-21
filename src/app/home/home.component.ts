import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatchService } from '../services/match.service';
import { hubService } from '../services/hub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService, public hubService: hubService) { }

  ngOnInit() {
    this.hubService.connectToHub()
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
    
    this.hubService.joinMatch(userId)

    this.hubService.hubConnection.on('redirectToMatch', (data: any) => {
      this.router.navigateByUrl('/match/'+data)
      console.log(data);
    })

    this.hubService.hubConnection!.on('joiningMatch', (data: any) => {
      console.log(data);
    })
  }
}


