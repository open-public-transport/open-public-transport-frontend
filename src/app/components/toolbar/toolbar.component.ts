import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {getBrowserLang} from "@ngneat/transloco";

/**
 * Displays toolbar
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** Environment */
  env = environment;

  /** Language */
  lang = getBrowserLang();
}
