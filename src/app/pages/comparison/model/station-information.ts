import {RankedValue} from "./ranked-value";

/**
 * Represents station information
 */
export class StationInformation {
  /** Public transport type */
  public_transport_type = "";
  /** Absolute station count */
  absolute_station_count: RankedValue;
  /** Absolute station accessibility count */
  absolute_station_accessibility_count: RankedValue;
  /** Relative station accessibility percentage */
  relative_station_accessibility_percentage: RankedValue;
  /** Relative station per sqkm */
  relative_station_per_sqkm: RankedValue;
  /** Relative station per inhabitants */
  relative_station_per_inhabitant: RankedValue;
}
