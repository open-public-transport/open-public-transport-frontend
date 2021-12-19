export const environment = {
  production: true,
  mapbox: {
    accessToken: 'pk.eyJ1Ijoib3BucGJsY3RybnNwcnQiLCJhIjoiY2tzeDJ0NWd5MG95cDJ3bHFicHZnaTc5ayJ9.bQNmZPQRhtzTaLV8BSuLiQ'
  },
  endpoint: {
    isochrones: 'https://open-public-transport-backend-pxicldzouq-ew.a.run.app/isochrones',
    transport: 'https://open-public-transport-backend-pxicldzouq-ew.a.run.app/transport',
    place: 'https://open-public-transport-backend-pxicldzouq-ew.a.run.app/place',
    isochrone: 'https://open-public-transport-backend-pxicldzouq-ew.a.run.app/isochrone',
    cities: 'https://open-public-transport-backend-pxicldzouq-ew.a.run.app/cities'
  },
  github: {
    // resultsUrl: 'https://raw.githubusercontent.com/open-public-transport/open-public-transport-results/main/results/' // Github
    // resultsUrl: 'https://storage.cloud.google.com/open-public-transport-results/' // Google Cloud
    resultsUrl: 'https://storage.googleapis.com/open-public-transport.appspot.com/' // Firebase
  },
  dashboard: {
    cities: [
      {name: 'Berlin', boundingBox: [13.0919927, 52.334886, 13.742786, 52.676262]},
      {name: 'Hamburg', boundingBox: [9.7341703, 53.739442, 10.324022, 53.396905]}
    ]
  },
  feature: {
    dashboard: true,
    comparison: true,
    overview: false
  }
};
