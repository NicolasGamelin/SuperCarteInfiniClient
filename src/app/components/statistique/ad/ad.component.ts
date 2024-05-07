import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Deck} from "../../../models/models";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class ADComponent implements OnInit, OnChanges{
  @Input()  selectedDeckID:number = 0;
  chart : any;
  StatByAttack: any[] = [];
  StatByDefense: any[] = [];
  d: { defense: number, y: number}[] = [];
  a: {attack: number, y: number}[] = [];
  constructor(public  Service:ApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {

    this.updateChart();
    console.log(this.d);
    console.log(this.a);
  }

  ngOnInit() {

    this.updateChart();
    console.log(this.d);
    console.log(this.a);
  }


  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();
    console.log(this.a);
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "stat par A/D"
    },
    axisX: {
      labelAngle: -90,
      interval: 1,

    },
    axisY: {
      title: "nombre de carte",
      interval: 1
    },


    toolTip: {
      shared: false
    },
    legend:{
      cursor:"pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "column",
      name: "attack",
      legendText: "attack",
      showInLegend: true,
      dataPoints:[
        {}
      ]
    }, {
      type: "column",
      name: "defense",
      legendText: "defense",
      showInLegend: true,
      dataPoints:[
        {}
      ]
    }]
  }

  async updateChart() {


    this.StatByAttack = await this.Service.StatByrAttack(this.selectedDeckID);
    this.StatByDefense = await this.Service.StatByDef(this.selectedDeckID);
    this.d = [];
    this.a = [];
   /* this.StatByDefense.forEach(e => {
      this.d.push({defense: e.Defense, y: e.count});
    });
    this.StatByAttack.forEach(e => {
      this.a.push({attack: e.attaque, y: e.count});
    });*/
    for (let  i =0; i < this.StatByDefense.length; i++) {
      
    }

    this.chartOptions.data[0].dataPoints = this.a;
    this.chartOptions.data[1].dataPoints = this.d;
    this.chart.render();

  }

}
