import {StationInformation} from "./station-information";
import {LineInformation} from "./line-information";
import {TravelDistanceInformation} from "./travel-distance-information";
import {BikeInformation} from "./bike-information";

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
  /** Bike information */
  bike_information: BikeInformation;
  /** Travel distance information */
  travel_distance_information: TravelDistanceInformation[];
}
