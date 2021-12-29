import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CityMetrics} from "../../comparison/model/city-metrics";
import {environment} from "../../../../environments/environment";

/**
 * Handles API calls against city endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class CityService {

  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves city information
   */
  getCities(): Observable<CityMetrics[]> {
    if (environment.endpoint.cities != null) {
      return this.http.get<CityMetrics[]>(
        environment.endpoint.cities, {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          })
        });
    } else {
      return of([]);
    }
  }
}
