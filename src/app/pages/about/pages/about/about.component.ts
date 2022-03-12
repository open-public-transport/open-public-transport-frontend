import {Component} from '@angular/core';
import {getBrowserLang} from "@ngneat/transloco";

/**
 * Displays about component
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  /** Language */
  lang = getBrowserLang();
}
