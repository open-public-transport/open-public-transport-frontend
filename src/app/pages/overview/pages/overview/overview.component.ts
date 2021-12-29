import {Component, OnInit} from '@angular/core';

/**
 * Displays city overview
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  /**
   * Constructor
   */
  constructor() {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.fetchCities();
  }

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    this.datasource.sortingDataAccessor = (item, header) => {
      return item[header];
    };
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  /**
   * Handles on-destroy phase
   */
  ngOnDestroy() {
    this.fetchSubscriptions.forEach(fetchSubscription => {
      fetchSubscription.unsubscribe();
    });
  }

  //
  // Actions
  //

  /**
   * Handles filter changes
   * @param event event
   */
  onFilterApplied(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  //
  // Helpers
  //

  /**
   * Fetches cities
   */
  private fetchCities() {
    const subscription = this.cityService
      .getCities()
      .subscribe((res) => {
        this.datasource.data = this.buildDatasource(res);
        this.cleanupFetchSubscription(subscription);
      });

    this.fetchSubscriptions.push(subscription);
  }

  /**
   * Builds datasource based on fetched result
   * @param res result
   */
  private buildDatasource(res: CityMetrics[]) {
    return res.map(cityMetrics => {

      console.log(`FOO cityMetrics ${JSON.stringify(cityMetrics)}`);

      const cityName = cityMetrics.city_basic_information.city_name;
      const federalStateName = cityMetrics.city_basic_information.federal_state_name;
      const inhabitants = cityMetrics.city_basic_information.inhabitants;
      const stations = cityMetrics.station_information.filter(information => {
        return information.public_transport_type == "all";
      })[0].absolute_stations_count.raw_value;
      const stationsPerInhabitant = Math.round(cityMetrics.station_information.filter(information => {
        return information.public_transport_type == "all";
      })[0].relative_stations_per_inhabitant.raw_value * 10_000) / 10;

      return {
        "cityName": cityName,
        "federalStateName": federalStateName,
        "inhabitants": inhabitants,
        "stations": stations,
        "stationsPerInhabitant": +stationsPerInhabitant
      }
    });
  }

  /**
   * Cleans fetch subscription
   * @param subscription subscription
   */
  private cleanupFetchSubscription(subscription?: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
    this.fetchSubscriptions = this.fetchSubscriptions.filter(
      (it) => it !== subscription
    );
  }

  /**
   * Determines if currently data is fetched
   */
  isFetchActive(): boolean {
    return this.fetchSubscriptions.length > 0;
  }
}
