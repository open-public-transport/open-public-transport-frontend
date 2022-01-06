import {TranslocoMissingHandler} from '@ngneat/transloco/lib/transloco-missing-handler';
import {TranslocoConfig} from '@ngneat/transloco';

export class TranslocoUndefMissingHandler implements TranslocoMissingHandler {
  handle(key: string, config: TranslocoConfig): void {
    if (!config.prodMode) {
      const msg = `Missing translation for '${key}', will return undefined`;
      console.warn(`%c ${msg}`, 'font-size: 12px; color: red');
    }
  }
}
