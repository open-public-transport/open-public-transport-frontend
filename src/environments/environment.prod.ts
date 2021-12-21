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
      {name: 'Berlin', boundingBox: [13.088333218007715, 52.33824183586156, 13.759587218876971, 52.67491714954712]},
      // {name: 'Bochum', boundingBox: [7.102082282000026, 51.41051770900003, 7.349335097000051, 51.531372340000075]},
      // {name: 'Bonn', boundingBox: [7.022537442000043, 50.63268994200007, 7.210679743000071, 50.77437020800005]},
      // {name: 'Bremen', boundingBox: [8.481735118728654, 53.01102137832358, 8.990780355986436, 53.60761767768827]},
      {name: 'Cottbus', boundingBox: [14.273306525769822, 51.69248183636231, 14.501295507607326, 51.86416174658669]},
      // {name: 'Dortmund', boundingBox: [7.303593755474529, 51.416072806289165, 7.637115868651861, 51.59952017917111]},
      // {name: 'Duesseldorf', boundingBox: [6.68881312000002, 51.124375875000055, 6.939933901000074, 51.352486457000055]},
      // {name: 'Duisburg', boundingBox: [6.625616443645652, 51.333198590659165, 6.83045999817622, 51.560220016593334]},
      // {name: 'Frankfurt-Main', boundingBox: [8.47276067000007, 50.01524884200006, 8.800381926000057, 50.22712951500006]},
      {name: 'Frankfurt-Oder', boundingBox: [14.394834417176915, 52.25277200883128, 14.600891619659311, 52.39823335093446]},
      {name: 'Hamburg', boundingBox: [9.73031519588174, 53.39507758854026, 10.325959157503767, 53.73808674380358]},
      // {name: 'Hamm', boundingBox: [7.675536280292723, 51.57805231922079, 7.997528913639968, 51.744766475157476]},
      {name: 'Koeln', boundingBox: [6.772530403000076, 50.83044939600006, 7.162027995000074, 51.08497434000003]},
      // {name: 'Muenchen', boundingBox: [11.36087720838895, 48.06223277978042, 11.723082533270206, 48.24814577602209]},
      // {name: 'Muenster', boundingBox: [7.473962942770497, 51.840191151329854, 7.774221787742102, 52.060175509627584]},
      {name: 'Potsdam', boundingBox: [12.888410253169791, 52.342942127472284, 13.165897844431854, 52.51476310782476]},
      // {name: 'Stuttgart', boundingBox: [9.03899379817525, 48.69015070969232, 9.315387276070416, 48.86724862272663]},
      // {name: 'Wuppertal', boundingBox: [7.01407471400006, 51.165736174000074, 7.313426359000061, 51.31809703300007]},
    ]
  },
  feature: {
    dashboard: true,
    comparison: true,
    overview: false
  }
};
