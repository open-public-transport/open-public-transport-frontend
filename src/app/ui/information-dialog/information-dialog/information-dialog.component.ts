import {Component} from '@angular/core';
import {getBrowserLang} from "@ngneat/transloco";
import {environment} from "../../../../environments/environment";
import {City} from "../../../pages/dashboard/model/city";
import {Router} from "@angular/router";

/**
 * Displays information dialog
 */
@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent {

  /** List of supported cities */
  cities = environment.dashboard.cities;

  /** Environment */
  env = environment;

  /** Language */
  lang = getBrowserLang();

  /**
   * Constructor
   */
  constructor(private router: Router) {
  }

  //
  // Actions
  //

  /**
   * Handles click on city button
   * @param city city
   */
  onCityButtonClicked(city: City) {
    this.router.navigate(["/dashboard", {city: city.name}]);
  }
}
