import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from "./pages/contact/contact.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [ContactComponent, ToolbarComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})
export class ContactModule {
}
