import {Component, Input} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

/**
 * Displays radar chart
 */
@Component({
  selector: 'app-rader-chart',
  templateUrl: './rader-chart.component.html',
  styleUrls: ['./rader-chart.component.scss']
})
export class RaderChartComponent {

  /** Labels */
  @Input() radarChartLabels: Label[] = [];
  /** Data */
  @Input() radarChartData: ChartDataSets[] = [];

  /** Options */
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: undefined,
    hover: undefined,
    layout: {
      padding: 0
    },
    scale: {
      display: true
    }
  };

  /** Type */
  radarChartType: ChartType = 'radar';
}
