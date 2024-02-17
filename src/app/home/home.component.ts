import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatchService } from '../services/match.service';
import {delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService) { }

  searching:boolean = false;
  ngOnInit() {

  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async joinMatch() {

    this.searching = true;
    await this.delay(30000);
    //prob pas tres bon
    if(this.searching){
      let matchId = -1;
     await this.router.navigate(['/match/' + matchId]);
      this.searching = false;
    }
  }
}


