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
  bounce = false;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.bounce = true;
    this.bounceme();
  }


  bounceme() {
    this.bounce = true;
    setTimeout(() => {this.bounce = false;},1000);
  }

}
