import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {City} from "../../model/city";

/**
 * Displays overlay component
 */
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  /** Event emitter indicating a new geocoder results */
  @Output() public citySelectionEventEmitter = new EventEmitter<City>();

  /** List of supported cities */
  cities = [];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.cities = environment.dashboard.cities;
  }

  //
  // Actions
  //

  /**
   * Handles click on city button
   * @param city city
   */
  onCityButtonClicked(city: City) {
    this.citySelectionEventEmitter.emit(city);
  }
}
