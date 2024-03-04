import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatchService } from '../services/match.service';
import { hubService } from '../services/hub.service';
import {delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService, public hubService: hubService) { }

  searching:boolean = false;
  searchingIndex:number = -1;
  ngOnInit() { this.hubService.connectToHub()}

  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async joinMatch() {

    this.searching = true;
    this.searchingIndex++;
    let i = this.searchingIndex;
    await this.delay(30000);
    //prob pas tres bon
    if(this.searching && i == this.searchingIndex){
      let matchId = -1;
     await this.router.navigate(['/match/' + matchId]);
      this.searching = false;
    }
  //async joinMatch(user1: boolean) {
  //  // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
  //  // TODO: Hub: Se connecter au Hub et joindre un match
  //  
  //  //let matchId = -1;
  //  //this.router.navigate(['/match/' + matchId]);
//
  //  let userId:string = user1 ? "User1Id" : "User2Id";
  //  if(user1)
  //    localStorage.setItem("playerId", "1");
  //  else
  //    localStorage.setItem("playerId", "2");
  //  
  //  await this.hubService.joinMatch(userId, null)
//
  //  this.hubService.hubConnection.on('redirectToMatch', (data: any) => {
  //    this.router.navigateByUrl('/match/'+data)
  //  })
  //}
}


