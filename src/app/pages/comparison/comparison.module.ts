import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './pages/comparison/comparison.component';
import {ComparisonRoutingModule} from './comparison-routing.module';
import {PlaceSelectionComponent} from './components/place-selection/place-selection.component';
import {MapModule} from "../../ui/map/map.module";
import {MatCardModule} from "@angular/material/card";
import { SpiderDiagramComponent } from './components/spider-diagram/spider-diagram.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [ComparisonComponent, PlaceSelectionComponent, SpiderDiagramComponent],
  imports: [
    CommonModule,
    ComparisonRoutingModule,
    MapModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class ComparisonModule {
}
