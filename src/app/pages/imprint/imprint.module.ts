import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImprintComponent} from './components/imprint/imprint.component';
import {ImprintRoutingModule} from "./imprint-routing.module";
import {TranslocoModule} from "@ngneat/transloco";


@NgModule({
  declarations: [
    ImprintComponent
  ],
  imports: [
    CommonModule,
    ImprintRoutingModule,

    // Translation
    TranslocoModule
  ]
})
export class ImprintModule {
}
