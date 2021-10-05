import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialIconService} from './services/material-icon.service';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [],
  providers: [
    MaterialIconService
  ]
})
/**
 * Contains services related to UI
 */
export class UiModule {
}
