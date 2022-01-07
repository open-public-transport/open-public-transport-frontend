import {Component, OnInit} from '@angular/core';
import {getBrowserLang} from "@ngneat/transloco";

/**
 * Displays about component
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /** Language */
  lang = getBrowserLang();

  /**
   * Constructor
   */
  constructor() {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
  }
}
