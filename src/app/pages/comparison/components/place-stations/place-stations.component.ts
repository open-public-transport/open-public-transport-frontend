import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Place} from "../../../../core/mapbox/model/place.model";
import {MapBoxStyle} from "../../../../core/mapbox/model/map-box-style.enum";
import {PlaceMetrics} from "../../model/place-metrics";
import {GeocoderResult} from "../../../../ui/map/model/geocoder-result";
import {Location} from "../../../../core/mapbox/model/location.model";

@Component({
  selector: 'app-place-stations',
  templateUrl: './place-stations.component.html',
  styleUrls: ['./place-stations.component.scss']
})
export class PlaceStationsComponent implements OnChanges {

  /** Map ID */
  @Input() mapId = "map";
  /** Geocoder result */
  @Input() geocoderResult: GeocoderResult;
  /** Place metrics */
  @Input() placeMetrics: PlaceMetrics;

  /** Center to focus */
  center: Location;

  /** Height of the map */
  mapHeight = "100%";

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;

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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges`);
    if (this.geocoderResult != null) {
      console.log(`AAA`);
      this.center = new Location("name", "description", this.geocoderResult.center[0], this.geocoderResult.center[1], 13.5);
    } else {
      console.log(`BBB`);
      this.center = Place.BRANDENBURG_GATE;
    }
  }
}
