import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InformationDialogComponent} from './information-dialog/information-dialog.component';
import {TranslocoModule} from "@ngneat/transloco";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    InformationDialogComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatTabsModule,

    // Translation
    TranslocoModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    InformationDialogComponent
  ]
})
export class InformationDialogModule {
}
