import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Metrics} from "../model/metrics";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

/**
 * Handles API calls against metrics endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  /**
   * Constructor
   * @param http http client
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves metrics based on given latitude and longitude
   * @param lat latitude
   * @param lon longitude
   */
  getMetrics(lat: string, lon: string): Observable<Metrics> {
    if (environment.endpoint.metrics != null) {
      return this.http.get<Metrics>(
        environment.endpoint.metrics, {
          params: {"lat": lat, "lon": lon},
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          })
        });
    } else {
      return of(null);
    }
  }

  /**
   * Retrieves metrics based on given latitude and longitude
   * @param lat latitude
   * @param lon longitude
   */
  postMetrics(lat: string, lon: string): Observable<Metrics> {
    if (environment.endpoint.metrics != null) {
      return this.http.post<Metrics>(
        environment.endpoint.metrics, {"lat": lat, "lon": lon}, {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*'
          })
        });
    } else {
      return of(null);
    }
  }
}
