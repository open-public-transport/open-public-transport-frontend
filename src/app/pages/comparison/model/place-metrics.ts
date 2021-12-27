import {StationInformation} from "./station-information";
import {LineInformation} from "./line-information";
import {TravelDistanceInformation} from "./travel-distance-information";

/**
 * Represents place metrics
 */
export class PlaceMetrics {
  /** Mobility index */
  mobility_index = -1;
  /** Station information */
  station_information: StationInformation[];
  /** Line information */
  line_information: LineInformation[];
  /** Travel distance information */
  travel_distance_information: TravelDistanceInformation[];
}
