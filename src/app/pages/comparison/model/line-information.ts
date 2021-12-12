import {RankedValue} from "./ranked-value";

export class LineInformation {
  transport_type = "";
  absolute_line_count: RankedValue;
  absolute_line_accessibility_count: RankedValue;
  absolute_line_accessibility_percentage: RankedValue;
  absolute_line_per_sqkm: RankedValue;
  absolute_line_per_inhabitant: RankedValue;
}
