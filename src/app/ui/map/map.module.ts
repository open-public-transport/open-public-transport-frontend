import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {LegendComponent} from './legend/legend.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSliderModule,
  ],
  declarations: [MapComponent, LegendComponent],
  entryComponents: [MapComponent],
  exports: [MapComponent]
})
export class MapModule {
}
