import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {City} from "../../model/city";
import {getBrowserLang} from "@ngneat/transloco";
import {MatSliderChange} from "@angular/material/slider";
import {SliderValue} from "../../model/slider-value";

/**
 * Displays overlay component
 */
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnChanges {

  /** Selected city */
  @Input() selectedCity: City;
  /** Selected transport */
  @Input() selectedTransport = new Map<string, boolean>();
  /** Hex layer aggregate property min */
  @Input() aggregatePropertyMin = null;
  /** Hex layer aggregate property max */
  @Input() aggregatePropertyMax = null;
  /** Event emitter indicating a new geocoder results */
  @Output() public citySelectionEventEmitter = new EventEmitter<City>();
  /** Event emitter indicating transport selection */
  @Output() public transportSelectionEventEmitter = new EventEmitter<Map<string, boolean>>();
  /** Event emitter indicating filter slider change */
  @Output() public filterSliderChangeEventEmitter = new EventEmitter<SliderValue>();

  /** List of all transport types */
  publicTransportTypes = ["bus", "light_rail", "subway", "tram"];
  /** List of supported cities */
  cities = environment.dashboard.cities;

  /** Filter results upper limit */
  filterHexResultsUpperLimit = 100;
  /** Filter results lower limit */
  filterHexResultsLowerLimit = 0;
  /** Filter results indicator stops */
  filterHexResultsIndicatorStops: string[] = [];

  /** Language */
  lang = getBrowserLang();

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeFilterHexResultsIndicatorStops()
  }

  /**
   * Handles on-changes phase
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeFilterHexResultsIndicatorStops()
  }

  //
  // Initialization
  //

  /**
   * Initializes filter hex results indicator stops
   */
  private initializeFilterHexResultsIndicatorStops() {

    if (this.aggregatePropertyMin != null && this.aggregatePropertyMax != null) {
      this.filterHexResultsIndicatorStops = [
        (this.aggregatePropertyMin / 1000).toFixed(1) + " km",
        ((this.aggregatePropertyMin + 0.33 * (this.aggregatePropertyMax - this.aggregatePropertyMin)) / 1000).toFixed(1) + " km",
        ((this.aggregatePropertyMin + 0.66 * (this.aggregatePropertyMax - this.aggregatePropertyMin)) / 1000).toFixed(1) + " km",
        (this.aggregatePropertyMax / 1000).toFixed(1) + " km"
      ]
    }
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

  /**
   * Handles filter changes
   * @param event slider event
   */
  onFilterChanged(event: MatSliderChange) {

    // Minimum distance between slider pointers in case they overlap
    let minSliderDist = 8;
    let initiator = event.source._elementRef.nativeElement.id

    switch (initiator) {
      case 'upper': {
        this.filterHexResultsUpperLimit = event.value;

        // Prevent upper slider to be left of lower slider
        if (this.filterHexResultsLowerLimit >= event.value - minSliderDist) {
          this.filterHexResultsLowerLimit = event.value - minSliderDist;
        }
        // Prevent upper slide to overlap lower slider
        if (event.value < minSliderDist) {
          setTimeout(() => event.source.value = minSliderDist);
          this.filterHexResultsUpperLimit = minSliderDist;
        }

        this.filterSliderChangeEventEmitter.next(new SliderValue(this.filterHexResultsLowerLimit, this.filterHexResultsUpperLimit));
        break;
      }
      case 'lower': {
        this.filterHexResultsLowerLimit = event.value;

        // Prevent lower slider to be right of upper slider
        if (this.filterHexResultsUpperLimit <= event.value + minSliderDist) {
          this.filterHexResultsUpperLimit = event.value + minSliderDist;
        }
        // Prevent upper slide to overlap lower slider
        if (event.value > 100 - minSliderDist) {
          setTimeout(() => event.source.value = 100 - minSliderDist);
          this.filterHexResultsLowerLimit = 100 - minSliderDist;
        }

        this.filterSliderChangeEventEmitter.next(new SliderValue(this.filterHexResultsLowerLimit, this.filterHexResultsUpperLimit));
        break;
      }
      default: {
        break;
      }
    }
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
