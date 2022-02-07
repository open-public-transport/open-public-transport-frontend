import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {MaterialIconService} from "./core/ui/services/material-icon.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {InformationDialogComponent} from "./ui/information-dialog/information-dialog/information-dialog.component";

/**
 * Displays app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  /** Title */
  title = 'Open Public Transport';

  /**
   * Constructor
   * @param iconRegistry Material icon registry
   * @param materialIconService Material icon service
   * @param sanitizer DOM sanitizer
   * @param dialog dialog
   */
  constructor(private iconRegistry: MatIconRegistry,
              private materialIconService: MaterialIconService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) {
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

  /**
   * Handles after-view-init-phase
   */
  ngAfterViewInit() {
    this.openInformationDialog();
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

  //
  // Actions
  //

  /**
   * Handles click on information button
   * @param event event
   */
  onInformationButtonClicked(event: MouseEvent) {
    this.openInformationDialog();
  }

  //
  // Helper
  //

  /**
   * Opens information dialog
   * @private
   */
  private openInformationDialog() {
    this.dialog.open(InformationDialogComponent);
  }
}
