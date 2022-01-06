import {HttpClient} from '@angular/common/http';
import {Translation, TRANSLOCO_LOADER, TranslocoLoader} from '@ngneat/transloco';
import {Injectable} from '@angular/core';
import {PlatformLocation} from '@angular/common';

@Injectable({providedIn: 'root'})
export class HttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    private platformLocation: PlatformLocation
  ) {
  }

  getTranslation(langPath: string) {
    return this.http.get<Translation>(
      `${
        window.location.origin
      }${this.platformLocation.getBaseHrefFromDOM()}assets/i18n/${langPath}.json`
    );
  }
}

export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: HttpLoader
};
