import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { PlayableCard } from 'src/app/models/models';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];
  @Input() align: string = 'top';
  @Input() showIcon!: boolean;
  bounce = false;



  constructor() {
  }

  ngOnInit() {

  }


}
