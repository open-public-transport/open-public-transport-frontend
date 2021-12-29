import {RankedValue} from "./ranked-value";

/**
 * Represents station information
 */
export class StationInformation {
  /** Transport type */
  transport_type = "";
  /** Absolute stations count */
  absolute_stations_count: RankedValue;
  /** Absolute stations accessibility count */
  absolute_stations_accessibility_count: RankedValue;
  /** Relative stations accessibility percentage */
  relative_stations_accessibility_percentage: RankedValue;
  /** Relative stations per sqkm */
  relative_stations_per_sqkm: RankedValue;
  /** Relative stations per inhabitants */
  relative_stations_per_inhabitant: RankedValue;
}
