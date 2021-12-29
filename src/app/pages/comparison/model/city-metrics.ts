import {StationInformation} from "./station-information";
import {TravelDistanceInformation} from "./travel-distance-information";
import {CityBasicInformation} from "./city-basic-information";

/**
 * City metrics
 */
export class CityMetrics {
  /** City basic information */
  city_basic_information: CityBasicInformation;
  /** Station information */
  station_information: StationInformation[];
  /** Travel distance information */
  travel_distance_information: TravelDistanceInformation[];
}
