import {Component} from '@angular/core';
import {getBrowserLang} from "@ngneat/transloco";

/**
 * Displays imprint component
 */
@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent {

  /** Language */
  lang = getBrowserLang();
}
