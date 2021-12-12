import {StationInformation} from "./station-information";
import {LineInformation} from "./line-information";
import {TravelDistanceInformation} from "./travel-distance-information";

export class PlaceMetrics {
  mobility_index = -1;
  station_information: StationInformation[];
  line_information: LineInformation[];
  travel_distance_information: TravelDistanceInformation[];
}
