import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input,
  OnChanges, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {environment} from '../../../../environments/environment';
import {Place} from '../../../core/mapbox/model/place.model';
import {MapBoxStyle} from '../../../core/mapbox/model/map-box-style.enum';
import {Location} from '../../../core/mapbox/model/location.model';
import {HttpClient} from '@angular/common/http';
import {MatSliderChange} from '@angular/material/slider';
import {Subject} from 'rxjs';
import {BoundingBox} from '../model/bounding-box.model';
import {ColorRamp} from '../model/color-ramp.model';
import {DOCUMENT} from '@angular/common';
import {UUID} from '../model/uuid.model';
import {GeocoderResult} from "../model/geocoder-result";

/**
 * Displays a map box
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnChanges, AfterViewInit {

  /** Unique ID for this map */
  @Input() id = UUID.toString();
  /** Height of the map */
  @Input() height = "500px";
  /** Display name of the map */
  @Input() displayName = '';

  /** Render style for Map */
  @Input() style = MapBoxStyle.STREETS_V11;
  /** Zoom factor */
  @Input() zoom = 10;
  /** Initial center of map */
  @Input() center: Location = Place.BRANDENBURG_GATE;
  /** Initial bounding box of map */
  @Input() boundingBox: number[];

  /** List of markers to be displayed */
  @Input() markers: Location[] = [];
  /** List of clickable markers to be displayed */
  @Input() clickableMarkers: Location[] = [];
  /** List of markers with a pop-up to be displayed */
  @Input() popupMarkers: Location[] = [];

  /** Whether interactive mode is enabled or not */
  @Input() interactiveEnabled = true;
  /** Whether navigation control is enabled or not */
  @Input() navigationControlEnabled = false;
  /** Whether full screen control is enabled or not */
  @Input() fullScreenControlEnabled = false;

  /** Whether scroll zoom is enabled or not */
  @Input() scrollZoomEnabled = true;
  /** Whether map zoom is enabled or not */
  @Input() boxZoomEnabled = true;
  /** Whether drag rotate is enabled or not */
  @Input() dragRotateEnabled = true;
  /** Whether drag pan is enabled or not */
  @Input() dragPanEnabled = true;
  /** Whether keyboard is enabled or not */
  @Input() keyboardEnabled = true;
  /** Whether double click zoom is enabled or not */
  @Input() doubleClickZoomEnabled = true;
  /** Whether touch zoom rotate is enabled or not */
  @Input() touchZoomRotateEnabled = true;

  /** Whether opacity should be parametrized or not */
  @Input() parametrizeOpacityEnabled = false;
  /** Map of opacity values */
  @Input() opacities = new Map<string, number>();
  /** Initial opacity */
  @Input() initialOpacity = 100;
  /** Fly-to location */
  @Input() flyToLocation: Location;
  /** Fly-to bounding box */
  @Input() flyToBoundingBox: BoundingBox;

  /** Whether geocoder is enabled or not */
  @Input() geocoderEnabled = false;
  /** Places to use for geocoder filter */
  @Input() geocoderFilter = [
    ["Deutschland", "Berlin"],
    ["Deutschland", "Hamburg"]
  ]

  /** Whether reset map position and zoom is enabled */
  @Input() resetEnabled = false;
  /** List of flyable location */
  @Input() flyableLocations: Location[] = [];

  /** List of results to be displayed  */
  @Input() results: string[] = [];
  /** List of results to be displayed as hexagons */
  @Input() hexResults: string[] = [];

  /** Hexagon edge size in km */
  @Input() cellSize = 0.5;
  /** Property to use aggregate data from */
  @Input() hexAggregateProperty = 'mean_spatial_distance_60min';
  /** Color ramp */
  @Input() hexColorRamp = ColorRamp.LUFTDATEN_COLOR_RAMP;
  /** Number of points that must be in hexagon to be created */
  @Input() hexBinLimit = 0;
  /** Value of a point that must exceeded to be counted for hexagon */
  @Input() hexBinThreshold = 0;
  /** Whether or not each layer should have an individual scale */
  @Input() individualScale = false;

  /** Whether to a map legend should show as gradient or not */
  @Input() legendGradient = true;
  /** Multi legend gradient */
  @Input() multiLegendGradient = new Map<string, boolean>();
  /** Whether to a map legend should show as gradient or not */
  @Input() multiLegend = false;
  /** Map of Colors and Values for Map Legend */
  @Input() legendContents = new Map<string, string>();
  /** Map of Colors and Values for Map Legend */
  @Input() multiLegendContents = new Map<string, Map<string, string>>();
  /** Legend component */
  @ViewChild('legend') legend: ElementRef;

  /** Opacity of active marker */
  @Input() opacityActive = 1.0;
  /** Opacity of passive marker */
  @Input() opacityPassive = 0.3;
  /** Default opacity */
  @Input() opacityDefault = 1.0;

  /** Whether or not debug mode is enabled */
  @Input() debug = false;

  /** Event emitter indicating a new geocoder results */
  @Output() public geocodingResultEventEmitter = new EventEmitter<GeocoderResult>();

  /** Map Box object */
  private map: mapboxgl.Map;

  /** Internal subject that publishes opacity events */
  private opacitySubject = new Subject<{ name: string, value: number }>();
  /** Internal subject that publishes flyable location events */
  private flyableLocationSubject = new Subject<Location>();
  /** Internal subject that publishes flyable bounding box events */
  private flyableBoundingBoxSubject = new Subject<BoundingBox>();

  /** List of currently displayed markers */
  private currentMarkers = [];
  /** List of currently displayed pop-up markers */
  private currentPopUpMarkers = [];

  /**
   * Constructor
   * @param document document
   * @param http http client
   */
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
  }

  //
  // Lifecycle hooks
  //

  /**
   * Handles on-changes phase
   * @param changes changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.opacities != null) {
      this.opacities.forEach((value: number, name: string) => {
        this.opacitySubject.next({name, value});
      });
    }

    if (this.map != null && this.popupMarkers != null) {
      this.initializePopupMarkers(this.popupMarkers);
    }

    if (this.flyToLocation != null) {
      this.flyableLocationSubject.next(this.flyToLocation);
    }
    if (this.flyToBoundingBox != null) {
      this.flyableBoundingBoxSubject.next(this.flyToBoundingBox);
    }
  }

  /**
   * Handles after-view-init phase
   */
  ngAfterViewInit() {
    this.initializeMapBox();

    // Initialize markers
    this.initializeMarkers(this.markers);
    this.initializeClickableMarkers(this.clickableMarkers);
    this.initializePopupMarkers(this.popupMarkers);

    // Initialize controls
    this.initializeNavigationControl(this.navigationControlEnabled);
    this.initializeFullScreenControl(this.fullScreenControlEnabled);

    // Initialize interactivity
    this.initializeScrollZoom(this.scrollZoomEnabled);
    this.initializeBoxZoom(this.boxZoomEnabled);
    this.initializeDragRotate(this.dragRotateEnabled);
    this.initializeDragPan(this.dragPanEnabled);
    this.initializeKeyboard(this.keyboardEnabled);
    this.initializeDoubleClickZoom(this.doubleClickZoomEnabled);
    this.initializeTouchZoomRotate(this.touchZoomRotateEnabled);

    this.initializeFlyTo();

    this.initializeGeocoder();

    // Display overlays
    this.initializeResultOverlays(this.results);
    this.initializeResultOverlays(this.hexResults);
  }

  //
  // Actions
  //

  /**
   * Handles mouse enter event
   */
  onMouseEnter() {
    this.initializeHoverableMarkers();
  }

  //
  // Helpers
  //

  /**
   * Initializes Map Box
   */
  private initializeMapBox() {
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: this.id,
      style: this.style,
      zoom: this.zoom,
      center: [this.center.longitude, this.center.latitude],
      interactive: this.interactiveEnabled
    });

    if (this.boundingBox != null) {
      // @ts-ignore
      this.map.fitBounds(this.boundingBox);
    }
  }

  /**
   * Initializes markers
   * @param markers markers
   */
  private initializeMarkers(markers: Location[]) {

    this.currentMarkers.forEach(marker => {
      marker.remove();
    });

    markers.forEach(marker => {
      const m = new mapboxgl.Marker()
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(this.map);
      this.currentMarkers.push(m);
    });
  }

  /**
   * Initializes clickable markers that will center the viewport on click
   * @param clickableMarkers clickable markers
   */
  private initializeClickableMarkers(clickableMarkers: Location[]) {
    this.map.on('load', () => {
      this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) {
            throw error;
          }
          this.map.addImage('custom-marker', image);
          this.map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: clickableMarkers.map(marker => {
                return {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      marker.longitude,
                      marker.latitude
                    ]
                  }
                };
              })
            }
          });
          this.map.addLayer({
            id: 'symbols',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker'
            }
          });

          // Handle click event
          this.map.on('click', 'symbols', e => {
            this.map.flyTo({
              // @ts-ignore
              center: e.features[0].geometry.coordinates
            });
          });

          // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
          this.map.on('mouseenter', 'symbols', () => {
            this.map.getCanvas().style.cursor = 'pointer';
          });

          // Change it back to a pointer when it leaves.
          this.map.on('mouseleave', 'symbols', () => {
            this.map.getCanvas().style.cursor = '';
          });
        });
    });
  }

  /**
   * Initializes markers that will open a pop-up on click
   * @param popupMarkers pop-up markers
   */
  private initializePopupMarkers(popupMarkers: Location[]) {

    this.currentPopUpMarkers.forEach(marker => {
      marker.remove();
    });

    popupMarkers.forEach(marker => {
      // Create the popup
      const popup = new mapboxgl.Popup({offset: 25}).setText(
        marker.description
      );

      // Create DOM element for the marker
      const el = document.createElement('div');
      el.id = `marker-${marker.name.toLowerCase()}`;

      // Create the marker
      const m = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(popup)
        .addTo(this.map);
      this.currentPopUpMarkers.push(m);
    });
  }

  /**
   * Initializes navigation control
   * @param navigationControlEnabled whether navigation control is enabled
   */
  private initializeNavigationControl(navigationControlEnabled: boolean) {
    if (navigationControlEnabled) {
      this.map.addControl(new mapboxgl.NavigationControl());
    }
  }

  /**
   * Initializes fullscreen control
   *
   * @param fullScreenControlEnabled whether full screen control should be enabled
   */
  private initializeFullScreenControl(fullScreenControlEnabled: boolean) {
    if (fullScreenControlEnabled) {
      this.map.addControl(new mapboxgl.FullscreenControl());
    }
  }

  /**
   * Initializes scroll zoom
   * @param scrollZoomEnabled whether scroll zoom should be enabled or not
   */
  private initializeScrollZoom(scrollZoomEnabled: boolean) {
    if (!scrollZoomEnabled) {
      this.map.scrollZoom.disable();
    }
  }

  /**
   * Initializes box zoom
   * @param boxZoomEnabled whether box zoom should be enabled or not
   */
  private initializeBoxZoom(boxZoomEnabled: boolean) {
    if (!boxZoomEnabled) {
      this.map.boxZoom.disable();
    }
  }

  /**
   * Initializes drag rotate
   * @param dragRotateEnabled whether drag rotate should be enabled or not
   */
  private initializeDragRotate(dragRotateEnabled: boolean) {
    if (!dragRotateEnabled) {
      this.map.dragRotate.disable();
    }
  }

  /**
   * Initializes drag pan
   * @param dragPanEnabled whether drag pan should be enabled or not
   */
  private initializeDragPan(dragPanEnabled: boolean) {
    if (!dragPanEnabled) {
      this.map.dragPan.disable();
    }
  }

  /**
   * Initializes keyboard
   * @param keyboardEnabled whether keyboard should be enabled or not
   */
  private initializeKeyboard(keyboardEnabled: boolean) {
    if (!keyboardEnabled) {
      this.map.keyboard.disable();
    }
  }

  /**
   * Initializes double click zoom
   * @param doubleClickZoomEnabled whether double click zoom should be enabled or not
   */
  private initializeDoubleClickZoom(doubleClickZoomEnabled: boolean) {
    if (!doubleClickZoomEnabled) {
      this.map.doubleClickZoom.disable();
    }
  }

  /**
   * Initializes touch zom rotate
   * @param touchZoomRotateEnabled whether touch zoom rotate should be enabled or not
   */
  private initializeTouchZoomRotate(touchZoomRotateEnabled: boolean) {
    if (!touchZoomRotateEnabled) {
      this.map.touchZoomRotate.disable();
    }
  }

  /**
   * Initializes subscription of fly-to events
   */
  private initializeFlyTo() {
    // Subscribe flyable locations subject
    this.flyableLocationSubject.subscribe((location: Location) => {
      this.map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: location.zoom ? location.zoom : this.zoom,
        pitch: 0,
        bearing: 0,
        essential: true
      });
    });

    // Subscribe flyable locations subject
    this.flyableBoundingBoxSubject.subscribe((boundingBox: BoundingBox) => {
      // @ts-ignore
      this.map.fitBounds(boundingBox);
    });
  }

  /**
   * Initializes geocoder
   */
  private initializeGeocoder() {
    if (this.geocoderEnabled) {

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        // filter: (result) => {
        //   console.log(`result ${JSON.stringify(result)}`);
        //   return result.place_name.toLowerCase().includes("berlin, deutschland")
        // },
        // bbox: BoundingBox.BERLIN
        limit: 100,
        filter: (result) => {
          return this.geocoderFilter.some(items =>
            items.every(item =>
              result.context.some(c => {
                return c.text === item;
              })
            )
          )
        },
      });

      this.map.addControl(geocoder);

      geocoder.on("result", result => {
        this.geocodingResultEventEmitter.emit(result.result as GeocoderResult);
      });
      geocoder.on("clear", result => {
        this.geocodingResultEventEmitter.emit(null);
      });
    }
  }

  /**
   * Initializes results overlays
   *
   * @param results results
   */
  private initializeResultOverlays(results: string[]) {
    this.map.on('load', () => {
    });
  }

  /**
   * Initializes hoverable markers
   */
  private initializeHoverableMarkers() {

    // Identify all markers on the map
    const hoverableMarkersElements = this.document.getElementsByClassName('mapboxgl-marker');
    const hoverableMarkers = Array.from(hoverableMarkersElements).map(e => {
      return e.id.replace(/marker-/g, '');
    });

    // Iterate over all markers
    hoverableMarkers.forEach(name => {

      // Get marker on the map
      const marker = this.document.getElementById(`marker-${name}`);
      // Get marker label in the text
      const markerLabel = this.document.getElementById(`marker-label-${name}`);

      // Define mouse-enter event
      const mouseEnterEvent = (_ => {

        // Iterate over all markers
        hoverableMarkers.forEach(hoverableMarker => {
          const markerElement = this.document.getElementById(`marker-${hoverableMarker}`);

          if (markerElement != null) {

            // Set markers active or passive depending on whether they are hovered or not
            if (hoverableMarker === name) {
              markerElement.style.opacity = this.opacityActive.toString();
              markerElement.style.border = '5px solid white';
              markerElement.style.zIndex = '10';
            } else {
              markerElement.style.opacity = this.opacityPassive.toString();
              markerElement.style.border = '0 solid transparent';
              markerElement.style.zIndex = '9';
            }
          }
        });
      });

      // Define mouse-leave event
      const mouseLeaveEvent = (_ => {

        // Iterate over all markers
        hoverableMarkers.forEach(hoverableMarker => {
          const markerElement = this.document.getElementById(`marker-${hoverableMarker}`);

          // Reset all markers to default
          if (markerElement != null) {
            markerElement.style.opacity = this.opacityDefault.toString();
            markerElement.style.border = '0 solid transparent';
            markerElement.style.zIndex = '9';
          }
        });
      });

      // Add events to markers
      try {
        marker.onmouseenter = mouseEnterEvent;
        marker.onmouseleave = mouseLeaveEvent;
      } catch (e) {
      }

      // Add events to marker labels
      try {
        markerLabel.onmouseenter = mouseEnterEvent;
        markerLabel.onmouseleave = mouseLeaveEvent;
      } catch (e) {
      }
    });
  }

  //
  // Actions
  //

  /**
   * Handles opacity changes
   * @param name result name
   * @param event slider event
   */
  onOpacityChanged(name: string, event: MatSliderChange) {
    if (this.parametrizeOpacityEnabled) {
      this.opacitySubject.next({name, value: event.value});
    }
  }

  /**
   * Handles clicks on flyable-location button
   * @param location location to fly to
   */
  onFlyableLocationClicked(location: Location) {
    this.flyableLocationSubject.next(location);
  }

  /**
   * Handles click on reset button
   */
  onResetClicked() {
    const initialLocation = new Location('init', '', this.zoom, this.center.longitude, this.center.latitude);
    this.flyableLocationSubject.next(initialLocation);
  }
}
