import {Component, OnInit} from '@angular/core';

/**
 * Displays about component
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
