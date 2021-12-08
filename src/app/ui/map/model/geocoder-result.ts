export class GeocoderResult {
  id = '';
  type = '';
  place_type = [];
  relevance = -1;
  properties: GeocoderResultProperties;
  text_de_DE = '';
  language_de_DE = '';
  place_name_de_DE = '';
  text = '';
  language = '';
  place_name = '';
  center = [];
  geometry: GeocoderGeometry;
  context: GeocoderContext[];
}

class GeocoderResultProperties {
  foursquare = "";
  address = "";
  wikidata = "";
  landmark = "";
  category = "";
  maki = "";
}

class GeocoderGeometry {
  coordinates = [];
  type = "";
}

class GeocoderContext {
  id = "";
  wikidata = "";
  text_de_DE = "";
  language_de_DE = "";
  text = "";
  language = "";
}
