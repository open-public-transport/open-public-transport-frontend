import {Component} from '@angular/core';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';
import {Place} from '../../../../core/mapbox/model/place.model';
import {MaterialIconService} from "../../../../core/ui/services/material-icon.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

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
  mapHeight = '100vh';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
}
