import {Component, Input} from '@angular/core';
import {Deck} from "../../../models/models";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class ADComponent {
  @Input()  selectedDeckID:number = 0;

}
