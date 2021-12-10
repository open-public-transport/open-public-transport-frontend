import {Component} from '@angular/core';
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {MetricsService} from "../../services/metrics.service";
import {Metrics} from "../../model/metrics";

/**
 * Displays comparison page
 */
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent {

  /** Selected geocoder result left */
  resultLeft: GeocoderResult;
  /** Selected geocoder result right */
  resultRight: GeocoderResult;

  /** Metrics of result left */
  metricsLeft: Metrics;
  /** Metrics of result right */
  metricsRight: Metrics;

  /**
   * Constructor
   * @param metricsService metrics service
   */
  constructor(private metricsService: MetricsService) {
  }

  //
  // Actions
  //

  /**
   * Handles left geocoder results
   * @param result geocoder result
   */
  onGeocodingResultLeftChanged(result: GeocoderResult) {
    this.resultLeft = result;

    if (result != null) {
      const lat = result.center[0];
      const lon = result.center[0];

      this.metricsService.getMetrics(lat, lon).subscribe((metrics: Metrics) => {
        this.metricsLeft = metrics;
      });
    }
  }

  /**
   * Handles right geocoder results
   * @param result geocoder result
   */
  onGeocodingResultRightChanged(result: GeocoderResult) {
    this.resultRight = result;

    if (result != null) {
      const lat = result.center[0];
      const lon = result.center[1];

      this.metricsService.getMetrics(lat, lon).subscribe((metrics: Metrics) => {
        this.metricsRight = metrics;
      });
    }
  }
}
