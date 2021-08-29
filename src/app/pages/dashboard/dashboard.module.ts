import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MapModule} from '../../ui/map/map.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MapModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})

export class DashboardModule {
}
