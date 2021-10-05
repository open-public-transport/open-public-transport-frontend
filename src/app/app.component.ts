import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {MaterialIconService} from "./core/ui/services/material-icon.service";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Displays app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** Title */
  title = 'Open Public Transport';

  /**
   * Constructor
   * @param iconRegistry Material icon registry
   * @param materialIconService Material icon service
   * @param sanitizer DOM sanitizer
   */
  constructor(private iconRegistry: MatIconRegistry,
              private materialIconService: MaterialIconService,
              private sanitizer: DomSanitizer) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-init phase
   */
  ngOnInit() {
    this.initializeMaterial();
  }

  //
  // Initialization
  //

  /**
   * Initializes material colors and icons
   */
  private initializeMaterial() {
    this.materialIconService.initializeIcons(this.iconRegistry, this.sanitizer);
  }
}
