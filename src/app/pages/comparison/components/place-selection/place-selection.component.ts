import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {PlaceMetrics} from "../../model/place-metrics";

/**
 * Displays place selection component
 */
@Component({
  selector: 'app-place-selection',
  templateUrl: './place-selection.component.html',
  styleUrls: ['./place-selection.component.scss']
})
export class PlaceSelectionComponent {

  /** Map ID */
  @Input() mapId = "map";
  /** Place metrics */
  @Input() placeMetrics: PlaceMetrics;
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
    } else {
      this.placeNames = [];
    }
    this.geocodingResultEventEmitter.emit(geocoderResult);
  }
}
