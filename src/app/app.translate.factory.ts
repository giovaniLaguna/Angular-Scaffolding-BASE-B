import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(
    http,
    'assets/i18n/', // json path
    '.json'
  );

}
