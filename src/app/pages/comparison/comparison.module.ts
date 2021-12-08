import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComparisonComponent} from './pages/comparison/comparison.component';
import {ComparisonRoutingModule} from './comparison-routing.module';
import { PlaceSelectionComponent } from './components/place-selection/place-selection.component';
import {MapModule} from "../../ui/map/map.module";

@NgModule({
  declarations: [ComparisonComponent, PlaceSelectionComponent],
    imports: [
        CommonModule,
        ComparisonRoutingModule,
        MapModule
    ]
})
export class ComparisonModule {
}
