import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  /** Selected city */
  @Input() selectedCity: City;
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

  //
  // Helpers
  //

  /**
   * Retrieves logo of means of transport
   * @param transport transport
   */
  getTransportLogo(transport: any) {
    return `../../../../../assets/images/logo_${transport}.png`;
  }
}
