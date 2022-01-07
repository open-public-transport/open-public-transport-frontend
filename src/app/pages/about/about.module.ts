import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './pages/about/about.component';
import {AboutRoutingModule} from './about-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,

    // Translation
    TranslocoModule
  ]
})
export class AboutModule {
}
