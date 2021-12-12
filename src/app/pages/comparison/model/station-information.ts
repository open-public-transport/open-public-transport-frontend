import {RankedValue} from "./ranked-value";

export class StationInformation {
  transport_type = "";
  absolute_stations_count: RankedValue;
  absolute_stations_accessibility_count: RankedValue;
  absolute_stations_accessibility_percentage: RankedValue;
  absolute_stations_per_sqkm: RankedValue;
  absolute_stations_per_inhabitant: RankedValue;
}
