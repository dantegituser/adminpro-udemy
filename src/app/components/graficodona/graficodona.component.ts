import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

@Input() doughnutChartLabels:string[] = [];
@Input() doughnutChartData:number[] = [];
@Input() doughnutChartType:string = '';

constructor() { }

  ngOnInit() {
  }

}
