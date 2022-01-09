import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {City} from "../../model/city";
import {getBrowserLang} from "@ngneat/transloco";

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
  /** Selected transport */
  @Input() selectedTransport = new Map<string, boolean>();
  /** Event emitter indicating a new geocoder results */
  @Output() public citySelectionEventEmitter = new EventEmitter<City>();
  /** Event emitter indicating transport selection */
  @Output() public transportSelectionEventEmitter = new EventEmitter<Map<string, boolean>>();

  /** List of all transport types */
  publicTransportTypes = ["bus", "light_rail", "subway", "tram"];
  /** List of supported cities */
  cities = [];

  /** Language */
  lang = getBrowserLang();

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

  /**
   * Handles click on transport button
   * @param transport transport
   * @param value value
   */
  onTransportButtonClicked(transport: string, value: boolean) {
    this.selectedTransport.set(transport, value);
    this.transportSelectionEventEmitter.emit(this.selectedTransport);
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
