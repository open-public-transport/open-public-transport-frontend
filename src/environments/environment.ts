// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1Ijoib3BucGJsY3RybnNwcnQiLCJhIjoiY2tzeDJ0NWd5MG95cDJ3bHFicHZnaTc5ayJ9.bQNmZPQRhtzTaLV8BSuLiQ'
  },
  endpoint: {
    isochrones: 'http://localhost:8000/isochrones',
    transport: 'http://localhost:8000/transport',
    place: 'http://localhost:8000/place',
    isochrone: 'http://localhost:8000/isochrone',
    cities: 'http://localhost:8000/cities'
  },
  github: {
    resultsUrl: 'https://raw.githubusercontent.com/open-public-transport/open-public-transport-results/main/results/'
  },
  dashboard: {
    cities: [
      {name: 'Berlin', boundingBox: [13.0919927, 52.334886, 13.742786, 52.676262]},
      {name: 'Hamburg', boundingBox: [9.7341703, 53.739442, 10.324022, 53.396905]}
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
