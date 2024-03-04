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

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async joinMatch() {

    this.searching = true;
    this.searchingIndex++;
    let i = this.searchingIndex;
    await this.hubService.joinMatch(localStorage.getItem("username")! , null)

    this.hubService.hubConnection.on('redirectToMatch', (data: any) => {
      this.router.navigateByUrl('/match/'+data)
      console.log(data);
    })
  }
}