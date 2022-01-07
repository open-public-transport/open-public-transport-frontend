import {Component, OnInit} from '@angular/core';
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
export class ToolbarComponent implements OnInit {

  /** Environment */
  env = environment;

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
