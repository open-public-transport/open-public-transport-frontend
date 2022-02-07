import {HttpClient} from '@angular/common/http';
import {Translation, TRANSLOCO_LOADER, TranslocoLoader} from '@ngneat/transloco';
import {Injectable} from '@angular/core';
import {PlatformLocation} from '@angular/common';

/**
 * Http loader
 */
@Injectable({providedIn: 'root'})
export class HttpLoader implements TranslocoLoader {

  /**
   * Constructor
   * @param http http
   * @param platformLocation platform location
   */
  constructor(
    private http: HttpClient,
    private platformLocation: PlatformLocation
  ) {
  }

  /**
   * Retrieves translation
   * @param langPath language path
   */
  getTranslation(langPath: string) {
    return this.http.get<Translation>(
      `${
        window.location.origin
      }${this.platformLocation.getBaseHrefFromDOM()}assets/i18n/${langPath}.json`
    );
  }
}

/**
 * Transloco loader
 */
export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: HttpLoader
};
