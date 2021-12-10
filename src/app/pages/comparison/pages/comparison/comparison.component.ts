import {Component} from '@angular/core';
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";

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

  //
  // Actions
  //

  /**
   * Handles left geocoder results
   * @param result geocoder result
   */
  onGeocodingResultLeftChanged(result: GeocoderResult) {
    this.resultLeft = result;

    // TODO Call our endpoint to get metrics
  }

  /**
   * Handles right geocoder results
   * @param result geocoder result
   */
  onGeocodingResultRightChanged(result: GeocoderResult) {
    this.resultRight = result;

    // TODO Call our endpoint to get metrics
  }
}
