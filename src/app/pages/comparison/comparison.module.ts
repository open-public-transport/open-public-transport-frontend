import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './pages/comparison/comparison.component';
import {ComparisonRoutingModule} from './comparison-routing.module';
import {PlaceSelectionComponent} from './components/place-selection/place-selection.component';
import {MapModule} from "../../ui/map/map.module";
import {MatCardModule} from "@angular/material/card";
import {RaderChartComponent} from './components/radar-chart/rader-chart.component';
import {MatButtonModule} from "@angular/material/button";
import {PlaceStationsComponent} from './components/place-stations/place-stations.component';
import {ChartsModule} from "ng2-charts";
import {PlaceOverviewComponent} from './components/place-overview/place-overview.component';
import {MatTabsModule} from "@angular/material/tabs";
import {PlaceDetailsComponent} from "./components/place-details/place-details.component";

@NgModule({
  declarations: [ComparisonComponent, PlaceSelectionComponent, RaderChartComponent, PlaceStationsComponent, PlaceOverviewComponent, PlaceDetailsComponent],
  imports: [
    CommonModule,
    ComparisonRoutingModule,
    MapModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    ChartsModule
  ]
})
export class ComparisonModule {
}
