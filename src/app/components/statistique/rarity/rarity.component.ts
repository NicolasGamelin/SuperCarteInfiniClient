import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Deck, PlayableCard} from "../../../models/models";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-rarity',
  templateUrl: './rarity.component.html',
  styleUrls: ['./rarity.component.css']
})
export class RarityComponent implements OnInit, OnChanges{
  @Input()  selectedDeckID:number = 0;
  chart : any;
  StatByRarity: any[] = [];
  d: {y: number, rarity: number}[] = [];
  constructor(public  Service:ApiService) {
  }

 ngOnChanges(changes: SimpleChanges) {

  this.updateChart();
  console.log(this.d);
}

   ngOnInit() {

    this.updateChart();
    console.log(this.d);
  }


  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "statistique par rareté de la carte "
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{y}: {rarity}",
      yValueFormatString: "#,###.##''",
      dataPoints:[{}]
    }]
  }




    async updateChart() {


      this.StatByRarity = await this.Service.StatByRarity(this.selectedDeckID);
      this.d = [];
      this.StatByRarity.forEach(e => {
        this.d.push({y: e.count, rarity: e.rarity});
      });

      this.chartOptions.data[0].dataPoints = this.d;
      this.chart.render();

    }

}
