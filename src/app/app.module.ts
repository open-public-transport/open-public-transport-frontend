import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapboxModule} from './core/mapbox/mapbox.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapModule} from './ui/map/map.module';
import {MatCardModule} from '@angular/material/card';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

import {TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, TranslocoConfig, TranslocoModule} from '@ngneat/transloco';
import {environment} from '../environments/environment';
import {TranslocoUndefMissingHandler} from './transloco-missing-handler';
import {translocoLoader} from './transloco.loader';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,

    // UI modules
    MapModule,

    // Core modules
    MapboxModule,

    MatButtonModule,
    MatToolbarModule,
    MatCardModule,

    TranslocoModule,

    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['de', 'en'],
        listenToLangChange: false,
        defaultLang: 'de',
        fallbackLang: ['de', 'en'],
        prodMode: environment.production
      } as TranslocoConfig
    },
    {
      provide: TRANSLOCO_MISSING_HANDLER,
      useClass: TranslocoUndefMissingHandler
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
