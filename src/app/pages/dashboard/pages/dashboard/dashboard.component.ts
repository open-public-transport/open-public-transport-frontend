import {Component, OnInit} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {BoundingBox} from "../../../../ui/map/model/bounding-box.model";
import {City} from "../../model/city";
import {ColorRamp} from "../../../../ui/map/model/color-ramp.model";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {getBrowserLang} from "@ngneat/transloco";
import {SliderValue} from "../../model/slider-value";

/**
 * Displays a dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /** Height of the map */
  mapHeight = 'calc(100vh - 64px)';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing bounding box */
  boundingBoxEnum = BoundingBox;
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

  /** Results filter lower limit */
  hexResultsFilterLowerLimit = 0;
  /** Results filter upper limit */
  hexResultsFilterUpperLimit = 100;

  /** Hex layer aggregate property min */
  aggregatePropertyMin = null;
  /** Hex layer aggregate property max */
  aggregatePropertyMax = null;

  /** Selected city */
  selectedCity;
  /** Selected transport */
  selectedTransport = new Map<string, boolean>();
  /** Transport layers */
  transportLayers = new Map<string, string>();

  /** Language */
  lang = getBrowserLang();

  /**
   * Constructor
   * @param route route
   */
  constructor(private route: ActivatedRoute) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeGeocoderFilter();
    this.initializeSelectedTransport();
    this.initializeParameterSubscription();
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

  /**
   * Initializes parameter subscription
   */
  private initializeParameterSubscription() {
    this.route.params.subscribe(
      params => {
        const cityName = params["city"];
        const city = environment.dashboard.cities.filter(city => {
          return city.name == cityName;
        })[0];

        if (city != null) {
          this.onCitySelected(city);
        }
      }
    );
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

  /**
   * Handles changes in filter slider
   * @param sliderValue slider value
   */
  onFilterSliderChanged(sliderValue: SliderValue) {
    this.hexResultsFilterLowerLimit = sliderValue.lower;
    this.hexResultsFilterUpperLimit = sliderValue.upper;
  }

  /**
   * Handles changes in hex layer aggregate property
   * @param value value
   */
  onHexLayerAggregatePropertyChanged(value: { aggregatePropertyMin: number, aggregatePropertyMax: number }) {
    this.aggregatePropertyMin = value.aggregatePropertyMin;
    this.aggregatePropertyMax = value.aggregatePropertyMax;
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
