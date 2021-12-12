import {StationInformation} from "./station-information";
import {TravelDistanceInformation} from "./travel-distance-information";
import {CityBasicInformation} from "./city-basic-information";

export class CityMetrics {
  city_basic_information: CityBasicInformation[];
  station_information: StationInformation[];
  travel_distance_information: TravelDistanceInformation[];
}
