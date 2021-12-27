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
  /** Absolute stations accessibility percentage */
  absolute_stations_accessibility_percentage: RankedValue;
  /** Absolute stations per sqkm */
  absolute_stations_per_sqkm: RankedValue;
  /** Absolute stations per inhabitants */
  absolute_stations_per_inhabitant: RankedValue;
}
