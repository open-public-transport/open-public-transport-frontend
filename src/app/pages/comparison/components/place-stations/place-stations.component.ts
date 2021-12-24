import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {PlaceMetrics} from "../../model/place-metrics";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {Location} from "../../../../core/mapbox/model/location.model";
import {environment} from "../../../../../environments/environment";
import {StationInformation} from "../../model/station-information";
import {LineInformation} from "../../model/line-information";

@Component({
  selector: 'app-place-stations',
  templateUrl: './place-stations.component.html',
  styleUrls: ['./place-stations.component.scss']
})
export class PlaceStationsComponent implements OnChanges {

  /** Map ID */
  @Input() mapId = "map";
  /** Geocoder result */
  @Input() geocoderResult: GeocoderResult;
  /** Place metrics */
  @Input() placeMetrics: PlaceMetrics;

  /** Overlay results */
  results = [];
  /** Center to focus */
  center: Location;

  /** Height of the map */
  mapHeight = "100%";

  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;

  /** List of available public transport */
  publicTransport = [];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeCenter();
    this.initializeOverlays();

    this.initializePublicTransport();
  }

  //
  // Initialization
  //

  /**
   * Initializes center
   */
  private initializeCenter() {
    if (this.geocoderResult != null) {
      this.center = new Location("name", "description", this.geocoderResult.center[0], this.geocoderResult.center[1], 12.5);
    } else {
      this.center = Place.BRANDENBURG_GATE;
    }
  }

  /**
   * Initializes overlays
   */
  private initializeOverlays() {
    if (this.geocoderResult != null) {
      const cityName = this.geocoderResult.context[2].text;
      const city = this.getCityByName(cityName);

      city.publicTransport.forEach(publicTransport => {
        this.results.push(`${city.name.toLowerCase()}/geojson/lines-${publicTransport}`);
        this.results.push(`${city.name.toLowerCase()}/geojson/stations-${publicTransport}`);
      });
    }
  }

  private initializePublicTransport() {
    if (this.geocoderResult != null) {
      const cityName = this.geocoderResult.context[2].text;
      const city = this.getCityByName(cityName);

      this.publicTransport = city.publicTransport;
    }
  }

  //
  // Helpers
  //

  /**
   * Returns a city by a given name
   * @param name
   * @private
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
        return information.transport_type == transport;
      })[0];
    } else {
      return null;
    }
  }

  /**
   * Returns line information based in means of transport
   * @param transport means of transport
   */
  getLineInformation(transport: string): LineInformation {
    if (this.placeMetrics != null && this.placeMetrics.line_information != null) {
      return this.placeMetrics.line_information.filter(information => {
        return information.transport_type == transport;
      })[0];
    } else {
      return null;
    }
  }
}
