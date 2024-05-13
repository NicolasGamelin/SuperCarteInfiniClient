import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Deck} from "../../../models/models";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit, OnChanges{
  @Input()  selectedDeckID:number = 0;
  chart : any;
  StatByCost: any[] = [];
  d: {cost: string, y: string}[] = [];
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
    title:{
      text: "stat par coût"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      title: "carte",
interval: 1
    },
    axisX:{ includeZero: true,
      title: "count",
      interval: 1},

    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#",
      dataPoints: [
        {}
      ]
    }]
  }




  async updateChart() {


    this.StatByCost = await this.Service.StatByCost(this.selectedDeckID);
    this.d = [];
    this.StatByCost.forEach(e => {
      this.d.push({cost: e.coût, y: e.count});
    });

    this.chartOptions.data[0].dataPoints = this.d;
    this.chart.render();

  }
}
