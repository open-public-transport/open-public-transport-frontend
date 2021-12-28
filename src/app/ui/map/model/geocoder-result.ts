/**
 * Represents geocoder result
 */
export class GeocoderResult {
  /** ID */
  id = '';
  /** Type */
  type = '';
  /** Place type */
  place_type = [];
  /** Relevance */
  relevance = -1;
  /** Properties */
  properties: GeocoderResultProperties;
  /** German text */
  text_de_DE = '';
  /** German language */
  language_de_DE = '';
  /** German place name */
  place_name_de_DE = '';
  /** Text */
  text = '';
  /** Language */
  language = '';
  /** Place name */
  place_name = '';
  /** Center */
  center = [];
  /** Geometry */
  geometry: GeocoderGeometry;
  /** Context */
  context: GeocoderContext[];
}

/**
 * Geocoder result properties
 */
class GeocoderResultProperties {
  /** Foursquare */
  foursquare = "";
  /** Address */
  address = "";
  /** Wikidata */
  wikidata = "";
  /** Landmark */
  landmark = false;
  /** Category */
  category = "";
  /** Maki */
  maki = "";
}

/**
 * Geocoder geometry
 */
class GeocoderGeometry {
  /** Coordinates */
  coordinates = [];
  /** Type */
  type = "";
}

/**
 * Geocoder context
 */
class GeocoderContext {
  /** ID */
  id = "";
  /** Wikidata */
  wikidata = "";
  /** German text */
  text_de_DE = "";
  /** German language */
  language_de_DE = "";
  /** Text */
  text = "";
  /** Language */
  language = "";
}
