import {Component, Input} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";

@Component({
  selector: 'app-place-selection',
  templateUrl: './place-selection.component.html',
  styleUrls: ['./place-selection.component.scss']
})
export class PlaceSelectionComponent {

  @Input() mapId = "map";

  /** Height of the map */
  mapHeight = '60vh';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /** Geocoder filter */
  geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Hamburg"]
  ];

  result: GeocoderResult;

  onGeocodingResultChanged(result: GeocoderResult) {
    console.log(`kam an`);
    console.log(`${JSON.stringify(result)}`);
    this.result = result;
  }
}
