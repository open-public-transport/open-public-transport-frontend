import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PlaceMetrics} from "../model/place-metrics";

/**
 * Handles API calls against place endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves place information based on given latitude and longitude
   * @param city city
   * @param lat latitude
   * @param lon longitude
   */
  getPlace(city: string, lat: string, lon: string): Observable<PlaceMetrics> {
    if (environment.endpoint.place != null) {
      return this.http.get<PlaceMetrics>(
        environment.endpoint.place, {
          params: {"city_id": city, "lat": lat, "lon": lon},
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          })
        });
    } else {
      return of(null);
    }
  }
}
