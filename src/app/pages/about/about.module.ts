import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './pages/about/about.component';
import {AboutRoutingModule} from './about-routing.module';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AboutComponent, ToolbarComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})
export class AboutModule {
}
