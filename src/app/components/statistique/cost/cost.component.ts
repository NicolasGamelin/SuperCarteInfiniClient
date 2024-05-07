import {Component, Input} from '@angular/core';
import {Deck} from "../../../models/models";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent {
  @Input()  selectedDeckID:number = 0;
}
