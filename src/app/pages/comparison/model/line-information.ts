import {RankedValue} from "./ranked-value";

/**
 * Represents line information
 */
export class LineInformation {
  /** Public transport type */
  public_transport_type = "";
  /** Absolute lines count */
  absolute_line_count: RankedValue;
  /** Absolute lines accessibility count */
  absolute_line_accessibility_count: RankedValue;
  /** Absolute lines accessibility percentage */
  absolute_line_accessibility_percentage: RankedValue;
  /** Absolute lines per sqkm */
  absolute_line_per_sqkm: RankedValue;
  /** Absolute lines per inhabitants */
  absolute_line_per_inhabitant: RankedValue;
}
