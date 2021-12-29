import {RankedValue} from "./ranked-value";

/**
 * Represents travel distance information
 */
export class TravelDistanceInformation {
  /** Public transport type */
  public_transport_type = "";
  /** Absolute average isochrone area */
  absolute_avg_isochrone_area: RankedValue;
  /** Absolute average isochrone area rank */
  absolute_avg_isochrone_area_rank: RankedValue;
}
