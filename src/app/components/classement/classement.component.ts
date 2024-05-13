import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from 'src/app/models/models';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { playerRankDTO } from 'src/app/models/playerRankDTO';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent implements OnInit {
  public topPlayers:Array<Player> | undefined;
  public closePlayers:playerRankDTO | undefined;
  public currentPlayerName:string | null = "";

  constructor(public service:ApiService) {
  }

  async ngOnInit(): Promise<void> {
      this.topPlayers = await this.getClassementTop();
      this.closePlayers = await this.getClosePlayers();
      this.currentPlayerName = localStorage.getItem("username");
  }

  async getClassementTop(): Promise<Player[]>{
    return await this.service.getClassementTop();
  }

  async getClosePlayers(): Promise<playerRankDTO>{
    return await this.service.getClosePlayers();
  }
}
