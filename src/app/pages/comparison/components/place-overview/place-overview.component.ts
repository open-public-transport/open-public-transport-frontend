import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {PlaceMetrics} from "../../model/place-metrics";
import {environment} from "../../../../../environments/environment";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {getBrowserLang, TranslocoService} from "@ngneat/transloco";

/**
 * Displays place overview
 */
@Component({
  selector: 'app-place-overview',
  templateUrl: './place-overview.component.html',
  styleUrls: ['./place-overview.component.scss']
})
export class PlaceOverviewComponent implements OnInit, OnChanges {

  /** Selected geocoder result left */
  @Input() geocoderResultLeft: GeocoderResult;
  /** Selected geocoder result right */
  @Input() geocoderResultRight: GeocoderResult;

  /** Place metrics of left geocoder result */
  @Input() placeMetricsLeft: PlaceMetrics;
  /** Place metrics of right geocoder result */
  @Input() placeMetricsRight: PlaceMetrics;

  /** Radar chart background color */
  @Input() radarChartBackgroundColorLeft;
  /** Radar chart border color */
  @Input() radarChartBorderColorLeft;

  /** Radar chart background color */
  @Input() radarChartBackgroundColorRight;
  /** Radar chart border color */
  @Input() radarChartBorderColorRight;

  /** Radar chart labels */
  radarChartLabels = [];
  /** Radar chart data */
  radarChartData = [];

  /** Place name left */
  placeNameLeft;
  /** Place name right */
  placeNameRight;

  /** List of available public transport types */
  publicTransportTypes = [];

  /** Active tab index */
  activeTabIndex = 0

  /** Language */
  lang = getBrowserLang();

  /**
   * Constructor
   *
   * @param translocoService transloco service
   */
  constructor(private translocoService: TranslocoService) {
  }

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
    this.initializeRadarChartData();
    this.initializeTabLabels();
  }

  //
  // Initialization
  //

  /**
   * Initializes list of public transport types
   */
  private initializePublicTransportTypes() {
    const publicTransportTypeMap = new Map<string, string>();

    if (this.geocoderResultLeft != null) {
      const context = this.geocoderResultLeft.context;
      const cityName = context[context.length - 2].text;
      const city = this.getCityByName(cityName);

      city.publicTransportTypes.forEach(publicTransportType => {
        publicTransportTypeMap.set(publicTransportType, publicTransportType);
      });
    }

    if (this.geocoderResultRight != null) {
      const context = this.geocoderResultRight.context;
      const cityName = context[context.length - 2].text;
      const city = this.getCityByName(cityName);

      city.publicTransportTypes.forEach(publicTransportType => {
        publicTransportTypeMap.set(publicTransportType, publicTransportType);
      });
    }

    this.publicTransportTypes = Array.from(publicTransportTypeMap.values());
  }

  /**
   * Initializes radar chart data
   */
  private initializeRadarChartData() {
    const bikeMetricLeft = 0;
    const publicTransportMetricsLeft = this.publicTransportTypes.map(publicTransportType => {
      if (this.placeMetricsLeft != null && this.placeMetricsLeft.station_information != null) {
        return this.placeMetricsLeft.station_information.filter(information => {
          return information.public_transport_type == publicTransportType;
        })[0].absolute_station_count.raw_value;
      } else {
        return null;
      }
    });

    const bikeMetricRight = 0;
    const publicTransportMetricsRight = this.publicTransportTypes.map(publicTransportType => {
      if (this.placeMetricsRight != null && this.placeMetricsRight.station_information != null) {
        return this.placeMetricsRight.station_information.filter(information => {
          return information.public_transport_type == publicTransportType;
        })[0].absolute_station_count.raw_value;
      } else {
        return null;
      }
    });

    this.radarChartData = [{
      data: [bikeMetricLeft].concat(publicTransportMetricsLeft),
      backgroundColor: this.radarChartBackgroundColorLeft,
      borderColor: this.radarChartBorderColorLeft,
      pointBackgroundColor: this.radarChartBorderColorLeft
    }, {
      data: [bikeMetricRight].concat(publicTransportMetricsRight),
      backgroundColor: this.radarChartBackgroundColorRight,
      borderColor: this.radarChartBorderColorRight,
      pointBackgroundColor: this.radarChartBorderColorRight
    }];

    this.radarChartLabels = [];

    this.translocoService.selectTranslate(`terms.number_of_stations`, {}, this.lang).subscribe(value => {
      this.radarChartLabels.push(value);
    });
    // this.translocoService.selectTranslate(`terms.bike`, {}, this.lang).subscribe(value => {
    //   this.radarChartLabels.push(value);
    // });
    this.publicTransportTypes.forEach(transportType => {
      this.translocoService.selectTranslate(`terms.${transportType}`, {}, this.lang).subscribe(value => {
        this.radarChartLabels.push(value);
      });
    });
  }

  /**
   * Initializes tab labels
   */
  private initializeTabLabels() {
    if (this.geocoderResultLeft != null) {
      this.placeNameLeft = this.geocoderResultLeft.place_name.split(",")[0];
    }
    if (this.geocoderResultRight != null) {
      this.placeNameRight = this.geocoderResultRight.place_name.split(",")[0];
    }
  }

  //
  // Actions
  //

  /**
   * Handles tab-changed event
   * @param event event
   */
  onTabChanged(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
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
