// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://restoran.kalasenja.my.id/api',
  // imageBaseUrl: 'https://restoran.kalasenja.my.id/storage/gambar_menu/',
  // imageBaseUrlProfile: 'https://restoran.kalasenja.my.id/storage/profile/'
  apiUrl: 'http://localhost:8000/api',
  imageBaseUrl: 'http://localhost:8000/storage/gambar_menu/',
  imageBaseUrlProfile: 'http://localhost:8000/img/foto_profile/'
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
