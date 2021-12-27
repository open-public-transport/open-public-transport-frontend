import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {PlaceMetrics} from "../../model/place-metrics";
import {environment} from "../../../../../environments/environment";

/**
 * Displays place selection component
 */
@Component({
  selector: 'app-place-selection',
  templateUrl: './place-selection.component.html',
  styleUrls: ['./place-selection.component.scss']
})
export class PlaceSelectionComponent implements OnChanges {

  /** Map ID */
  @Input() mapId = "map";
  /** Place metrics */
  @Input() placeMetrics: PlaceMetrics;

  /** Radar chart background color */
  @Input() radarChartBackgroundColor;
  /** Radar chart border color */
  @Input() radarChartBorderColor;
  /** Radar chart point background color */
  @Input() radarChartPointBackgroundColor;

  /** Event emitter indicating a new geocoder results */
  @Output() public geocodingResultEventEmitter = new EventEmitter<GeocoderResult>();

  /** Height of the map */
  mapHeight = "100%";

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Geocoder filter */
  geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Hamburg"]
  ];

  /** Selected geocoder result */
  geocoderResult: GeocoderResult;
  /** Place names of selected geocoder result */
  placeNames = [];
  /** Radar chart labels */
  radarChartLabels = [];
  /** Radar chart data */
  radarChartData = [];

  /** List of available public transport */
  publicTransport = [];

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes phase
   */
  ngOnChanges(changes: SimpleChanges) {
    this.initializeRadarChartData();
  }

  //
  // Initialization
  //

  /**
   * Initializes radar chart data
   */
  private initializeRadarChartData() {
    const bikeMetric = 0;
    const publicTransportMetrics = this.publicTransport.map(transport => {
      if (this.placeMetrics != null && this.placeMetrics.station_information != null) {
        return this.placeMetrics.station_information.filter(information => {
          return information.transport_type == transport;
        })[0].absolute_stations_count.raw_value;
      } else {
        return null;
      }
    });

    this.radarChartData = [{
      data: [bikeMetric].concat(publicTransportMetrics),
      backgroundColor: this.radarChartBackgroundColor,
      borderColor: this.radarChartBorderColor,
      pointBackgroundColor: this.radarChartPointBackgroundColor
    }];
    this.radarChartLabels = this.radarChartData[0]["data"].map(_ => {
      return "";
    });
  }

  //
  // Actions
  //

  /**
   * Handles geocoder results
   * @param geocoderResult geocoder result
   */
  onGeocodingResultChanged(geocoderResult: GeocoderResult) {
    this.geocoderResult = geocoderResult;
    if (geocoderResult != null) {
      this.placeNames = geocoderResult.place_name.split(",");

      const cityName = this.geocoderResult.context[2].text;
      const city = this.getCityByName(cityName);

      this.publicTransport = city.publicTransport;
    } else {
      this.placeNames = [];
      this.publicTransport = [];
    }
    this.geocodingResultEventEmitter.emit(geocoderResult);
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
}
