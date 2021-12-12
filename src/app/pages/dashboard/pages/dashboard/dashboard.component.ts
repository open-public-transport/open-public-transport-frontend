import {Component} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {BoundingBox} from "../../../../ui/map/model/bounding-box.model";

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
  /** Enum representing bounding boxes */
  boundingBoxEnum = BoundingBox;

  /** Geocoder filter */
  geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Hamburg"]
  ];

  /** Isochrone results */
  hexResults = [
    "berlin/geojson/isochrones-15",
    // "hamburg/geojson/isochrones-15",
  ];
}
