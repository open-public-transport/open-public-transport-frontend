import {Component} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {BoundingBox} from "../../../../ui/map/model/bounding-box.model";
import {City} from "../../model/city";
import {ColorRamp} from "../../../../ui/map/model/color-ramp.model";
import {environment} from "../../../../../environments/environment";

/**
 * Displays a dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /** Height of the map */
  mapHeight = 'calc(100vh - 64px)';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Enum representing color ramp */
  colorRampEnum = ColorRamp;

  /** Bounding box to fly to */
  flyToBoundingBox;

  /** Geocoder filter */
  geocoderFilter = [];

  /** Overlay results */
  results = [];
  /** Opacities */
  opacities = new Map<string, number>();


  /** Isochrone results */
  hexResults = [];
  /** Hexagon bounding box */
  hexBoundingBox = BoundingBox.BERLIN;

  /** Selected city */
  selectedCity;
  /** Selected transport */
  selectedTransport = new Map<string, boolean>();
  /** Transport layers */
  transportLayers = new Map<string, string>();

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeGeocoderFilter();
    this.initializeSelectedTransport();
  }

  //
  // Initialization
  //

  /**
   * Initializes geocoder filter
   */
  private initializeGeocoderFilter() {
    this.geocoderFilter = environment.dashboard.cities.map(city => {
      return ["Deutschland", city.name];
    });
  }

  /**
   * Initializes selected transport
   */
  private initializeSelectedTransport() {
    this.selectedTransport.set("bus", false);
    this.selectedTransport.set("light_rail", false);
    this.selectedTransport.set("subway", false);
    this.selectedTransport.set("tram", false);
  }

  //
  // Actions
  //

  /**
   * Handles selection of city
   * @param city city
   */
  onCitySelected(city: City) {
    this.selectedCity = city;

    city.publicTransportTypes.forEach(publicTransportType => {
      this.transportLayers.set(`${city.name.toLowerCase()}/geojson/lines-${publicTransportType}`, publicTransportType);
      this.transportLayers.set(`${city.name.toLowerCase()}/geojson/stations-${publicTransportType}`, publicTransportType);
    });

    this.hexResults = [`${city.name.toLowerCase()}/geojson/isochrones-15`]
    this.hexBoundingBox = city.boundingBox;
    this.flyToBoundingBox = city.boundingBox;

    this.filterTransportLayers();
  }

  /**
   * Handles selection of transport
   * @param transport transport
   */
  onTransportSelected(transport: Map<string, boolean>) {
    this.selectedTransport = transport;

    this.filterTransportLayers();
  }

  //
  // Helpers
  //

  /**
   * Filters results
   */
  private filterTransportLayers() {
    this.results = Array.from(this.transportLayers.entries()).filter(entry => {
      const selected = this.selectedTransport.get(entry[1]);
      this.opacities.set(entry[0], selected ? 100 : 0);

      return selected;
    }).map(entry => {
      return entry[0];
    });
  }
}
