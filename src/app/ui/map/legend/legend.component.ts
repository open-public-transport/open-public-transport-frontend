import {Component, Input} from '@angular/core';

/**
 * Displays a legend for a map
 */
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {

  /** Display name of the map */
  @Input() displayName = '';

  /** Whether to a map legend should show as gradient or not */
  @Input() legendGradient = true;
  /** Multi legend gradient */
  @Input() multiLegendGradient = new Map<string, boolean>();
  /** Whether to a map legend should show as gradient or not */
  @Input() multiLegend = false;
  /** Map of Colors and Values for Map Legend */
  @Input() legendContents = new Map<string, string>();
  /** Map of Colors and Values for Map Legend */
  @Input() multiLegendContents = new Map<string, Map<string, string>>();

  /** Map of opacity values */
  @Input() opacities = new Map<string, number>();

  //
  // Helpers
  //

  //
  // Multi legend
  //

  /**
   * Returns list of layers
   */
  getLayers() {
    return Object.keys(this.multiLegendContents);
  }

  /**
   * Returns rows by layer
   * @param layer layer
   */
  getRowId(layer: string) {
    return `${layer}-legend`;
  }

  /**
   * Returns gradient by layer
   * @param layer layer
   */
  hasGradient(layer: string) {
    return this.multiLegendGradient[layer];
  }

  /**
   * Returns gradient style
   * @param layer layer
   */
  getGradientStyleByLayer(layer: string) {
    return {
      background: `linear-gradient(90deg, ${this.getMultiLegendContent(layer).join(',')})`
    };
  }

  /**
   * Returns legend content by layer
   * @param layer layer
   */
  getMultiLegendContent(layer: string) {
    return Object.keys(this.multiLegendContents[layer]);
  }

  /**
   * Return description by layer
   * @param layer layer
   * @param multiLegendContent content
   */
  getMultiLegendDescription(layer: string, multiLegendContent: string) {
    return this.multiLegendContents[layer][multiLegendContent];
  }

  /**
   * Checks if layer is visble
   * @param layer layer
   */
  isVisible(layer: string) {
    return this.opacities.has(layer) && this.opacities.get(layer) > 0;
  }

  //
  // Single legend
  //

  /**
   * Returns gradient style
   */
  getGradientStyle() {
    return {background: `linear-gradient(90deg, ${this.getLegendContent().join(',')})`};
  }

  /**
   * Returns legend content
   */
  getLegendContent() {
    return Object.keys(this.legendContents);
  }

  /**
   * Returns description
   * @param content content
   */
  getDescription(content: string) {
    return this.legendContents[content];
  }
}
