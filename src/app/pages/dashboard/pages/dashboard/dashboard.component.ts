import {Component} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {BoundingBox} from "../../../../ui/map/model/bounding-box.model";
import {City} from "../../model/city";
import {ColorRamp} from "../../../../ui/map/model/color-ramp.model";

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

  flyToBoundingBox;

  /** Geocoder filter */
  geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Hamburg"]
  ];

  /** Isochrone results */
  hexResults = ["berlin/geojson/isochrones-15"];
  /** Hexagon bounding box */
  hexBoundingBox = BoundingBox.BERLIN;

  //
  // Actions
  //

  /**
   * Handles selection of city
   * @param city city
   */
  onCitySelected(city: City) {
    this.hexResults = [`${city.name.toLowerCase()}/geojson/isochrones-15`]
    this.hexBoundingBox = city.boundingBox;
    this.flyToBoundingBox = city.boundingBox;
  }
}
