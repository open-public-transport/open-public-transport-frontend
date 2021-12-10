import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";

/**
 * Displays place selection component
 */
@Component({
  selector: 'app-place-selection',
  templateUrl: './place-selection.component.html',
  styleUrls: ['./place-selection.component.scss']
})
export class PlaceSelectionComponent {

  @Input() mapId = "map";

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
  result: GeocoderResult;
  /** Place names of selected geocoder result */
  placeNames = [];

  //
  // Actions
  //

  /**
   * Handles geocoder results
   * @param result geocoder result
   */
  onGeocodingResultChanged(result: GeocoderResult) {
    this.result = result;
    this.placeNames = result.place_name.split(",");
  }
}
