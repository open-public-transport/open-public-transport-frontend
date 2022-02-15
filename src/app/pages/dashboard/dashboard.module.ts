import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MapModule} from '../../ui/map/map.module';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {OverlayComponent} from './components/overlay/overlay.component';
import {TranslocoModule} from "@ngneat/transloco";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [DashboardComponent, OverlayComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MapModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTooltipModule,

    // Translation
    TranslocoModule
  ]
})

export class DashboardModule {
}
