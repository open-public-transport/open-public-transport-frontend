import { Component, OnInit } from '@angular/core';
import {Place} from '../../../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../../../core/mapbox/model/map-box-style.enum';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent { /** implements OnInit { */

  /** constructor() { } */

  /** Height of the map */
  mapHeight = '55vh';

  /** Enum representing places */
  placeEnum = Place;
  /** Enum representing map box style */
  mapBoxStyleEnum = MapBoxStyle;
  /**
  ngOnInit(): void {
  }
  */
}
