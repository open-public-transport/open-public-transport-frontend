/**
 * Represents a location
 */
export class Location {

  /**
   * Constructor
   * @param name name
   * @param description description
   * @param longitude longitude
   * @param latitude latitude
   * @param zoom zoom
   */
  constructor(public name: string, public description: string, public longitude: number, public latitude: number, public zoom: number = 11.5) {
  }
}
