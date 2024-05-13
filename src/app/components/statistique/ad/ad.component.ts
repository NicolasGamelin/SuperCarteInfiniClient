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
  d: { x: string, y: number}[] = [];
  a: {x: string, y: number}[] = [];
  constructor(public  Service:ApiService) {
  }

  async ngOnChanges(changes: SimpleChanges) {



    this.updateChart();

  }

  ngOnInit() {

    this.updateChart();

  }


  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();

  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: "Statistique par attaque et défense"
    },
    axisX: {
      labelAngle: -90
      , interval: 1
    },
    axisY: {
      title: "nombre de cartes"
      , interval: 1
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
      name: "attaque",
      legendText: "attaque",
      showInLegend: true,
      dataPoints:[
        {}
      ]
    }, {
      type: "column",
      name: "Defense",
      legendText: "Defense",
      showInLegend: true,
      dataPoints:[
        {}
      ]
    }]
  }

  async updateChart() {

    this.StatByAttack = await this.Service.StatByrAttack(this.selectedDeckID);


    this.d = [];
    this.a = [];
    this.StatByAttack.forEach(e => {
      this.a.push({x: e.valeur, y: e.attaque});
      this.d.push({x: e.valeur, y: e.defense});
    });



   console.log(this.a);
    console.log(this.d);






    this.chartOptions.data[0].dataPoints = this.a;
    this.chartOptions.data[1].dataPoints = this.d;
    this.chart.render();


  }

}
