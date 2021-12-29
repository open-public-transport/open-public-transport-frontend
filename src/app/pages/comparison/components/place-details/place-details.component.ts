import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlaceMetrics} from "../../model/place-metrics";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {environment} from "../../../../../environments/environment";
import {StationInformation} from "../../model/station-information";
import {LineInformation} from "../../model/line-information";

/**
 * Displays place details
 */
@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit, OnChanges {

  /** Place name */
  @Input() placeName = "";
  /** Geocoder result */
  @Input() geocoderResult: GeocoderResult;
  /** Place metrics of geocoder result */
  @Input() placeMetrics: PlaceMetrics;

  /** List of available public transport types */
  publicTransportTypes = [];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
  }

  /**
   * Handles on-changes phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializePublicTransportTypes();
  }

  //
  // Initialization
  //

  /**
   * Initializes list of public transport types
   */
  private initializePublicTransportTypes() {
    if (this.geocoderResult != null) {
      const cityName = this.geocoderResult.context[2].text;
      const city = this.getCityByName(cityName);

      this.publicTransportTypes = city.publicTransportTypes;
    }
  }

  //
  // Helpers
  //

  /**
   * Returns a city by a given name
   * @param name name
   */
  private getCityByName(name: string) {
    const cities = environment.dashboard.cities.filter(city => {
      return city.name === name;
    });

    return cities[0];
  }

  /**
   * Retrieves logo of means of transport
   * @param transport transport
   */
  getTransportLogo(transport: any) {
    return `../../../../../assets/images/logo_${transport}.png`;
  }

  /**
   * Returns station information based in means of transport
   * @param transport means of transport
   */
  getStationInformation(transport: string): StationInformation {
    if (this.placeMetrics != null && this.placeMetrics.station_information != null) {
      return this.placeMetrics.station_information.filter(information => {
        return information.public_transport_type == transport;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Returns station information based in means of transport
   * @param transport means of transport
   */
  getLineInformation(transport: string): LineInformation {
    if (this.placeMetrics != null && this.placeMetrics.line_information != null) {
      return this.placeMetrics.line_information.filter(information => {
        return information.public_transport_type == transport;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Returns bike information
   */
  getBikeInformation() {
    if (this.placeMetrics != null && this.placeMetrics.bike_information != null) {
      return this.placeMetrics.bike_information;
    } else {
      return null;
    }
  }
}
