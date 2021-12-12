import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import * as turfMeta from '@turf/meta';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
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
import RBush from 'rbush';

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
  @Input() hexCellSize = 0.5;
  /** Hexagon bounding box */
  @Input() hexBoundingBox = BoundingBox.BERLIN;
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

  /** Whether legend is enabled or not */
  @Input() legendEnabled = false;
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

    // Display overlays
    this.initializeResultOverlays(this.results);
    this.initializeHexResultOverlays(this.hexResults);
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
    this.initializeHexResultOverlays(this.hexResults);
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
          return result != null && this.geocoderFilter.some(items =>
            items.every(item =>
                result.context != null && result.context.some(c => {
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
      geocoder.on("error", error => {
        console.error(error);
      });
    }
  }

  /**
   * Initializes results overlays
   *
   * @param results results
   */
  private initializeResultOverlays(results: string[]) {
    if (this.map != null) {
      this.map.on('load', () => {

        // Base URL for results
        const baseUrl = environment.github.resultsUrl;

        results.forEach(name => {

          // Add source
          this.map.addSource(name,
            {
              type: 'geojson',
              data: baseUrl + name + '.geojson'
            }
          );

          // Download styling for result
          this.http.get(baseUrl + 'styles/' + name + '.json', {responseType: 'text' as 'json'}).subscribe((data: any) => {
            this.initializeLayer(name, data);
          });
        });
      });
    }
  }

  /**
   * Initializes a layer
   * @param name name
   * @param data data
   */
  private initializeLayer(name: string, data: any) {
    // Link layer to source
    const layer = JSON.parse(data);
    layer['id'] = name + '-layer';
    layer['source'] = name;

    // Get ID of first layer which contains labels
    const firstSymbolId = this.getFirstLayerWithLabels(this.map);

    // Remove layer
    if (this.map.getLayer(layer['id'])) {
      this.map.removeLayer(layer['id']);
    }

    // Add layer
    this.map.addLayer(layer, firstSymbolId);

    // Initialize layer transparency
    if (layer['paint'].hasOwnProperty('fill-color')) {
      this.map.setPaintProperty(layer['id'], 'fill-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('line-color')) {
      this.map.setPaintProperty(layer['id'], 'line-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('heatmap-color')) {
      this.map.setPaintProperty(layer['id'], 'heatmap-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('circle-color')) {
      this.map.setPaintProperty(layer['id'], 'circle-opacity', this.initialOpacity / 100);
    }

    // Update layer transparency
    this.opacitySubject.subscribe((e: { name, value }) => {
      const layerId = e.name + '-layer';

      if (layer.id === layerId) {
        if (layer['paint'].hasOwnProperty('fill-color')) {
          this.map.setPaintProperty(layerId, 'fill-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('line-color')) {
          this.map.setPaintProperty(layerId, 'line-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('heatmap-color')) {
          this.map.setPaintProperty(layerId, 'heatmap-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('circle-color')) {
          this.map.setPaintProperty(layerId, 'circle-opacity', e.value / 100);
        }
      }
    });

    // Check if debug mode is enabled
    if (this.debug) {
      this.map.on('click', name + '-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`value ${e.features[0]
            .properties['max_spatial_distance_15min']} / coords ${e.features[0].geometry['coordinates']}`)
          .addTo(this.map);
      });
    }
  }

  /**
   * Initializes hex results overlays
   *
   * @param results results
   */
  private initializeHexResultOverlays(results: string[]) {
    if (this.map != null) {
      // this.map.on('load', () => {

        // Base URL for results
        const baseUrl = environment.github.resultsUrl;

        // Map of results
        const resultsMap: Map<string, any> = new Map();

        // Initialize scale
        let aggregatePropertyMin = 10_000;
        let aggregatePropertyMax = -10_000;
        let aggregatePropertyStep = 1;

        results.forEach(name => {

          // Download geojson for result
          this.http.get(baseUrl + name, {responseType: 'text' as 'json'}).subscribe((geojsonData: any) => {

            const processedGeojson = this.preprocessHexagonData(JSON.parse(geojsonData), this.hexBoundingBox,
              this.hexAggregateProperty, this.hexCellSize, this.hexBinLimit, this.hexBinThreshold);

            // Save preprocessed GeoJSON
            resultsMap.set(name, processedGeojson);

            // Add source
            if (!this.map.getSource(name)) {
              this.map.addSource(name, {
                  type: 'geojson',
                  data: processedGeojson
                }
              );
            }

            // Check if individual scale should be applied
            if (this.individualScale) {

              const aggregatePropertyValues = processedGeojson.features.map(f => {
                return f['properties']['avg'];
              });
              aggregatePropertyMin = Math.min(...aggregatePropertyValues);
              aggregatePropertyMax = Math.max(...aggregatePropertyValues);
              aggregatePropertyStep = (aggregatePropertyMax - aggregatePropertyMin) / this.hexColorRamp.length;

              // Just draw this layer with its individual scale
              this.initializeHexLayer(name, aggregatePropertyMin, aggregatePropertyStep);
            } else {
              // Re-calculate scale
              resultsMap.forEach((p, _) => {
                const aggegatePropertyValues = p.features.map(f => {
                  return f['properties']['avg'];
                });
                const layerAggregatePropertyMin = Math.min(...aggegatePropertyValues);
                const layerAggregatePropertyMax = Math.max(...aggegatePropertyValues);

                if (layerAggregatePropertyMin < aggregatePropertyMin) {
                  aggregatePropertyMin = layerAggregatePropertyMin;
                }
                if (layerAggregatePropertyMax > aggregatePropertyMax) {
                  aggregatePropertyMax = layerAggregatePropertyMax;
                }
              });

              // Re-calculate step
              aggregatePropertyStep = (aggregatePropertyMax - aggregatePropertyMin) / this.hexColorRamp.length;

              // Re-draw each layer with unified scale
              resultsMap.forEach((_, n) => {
                this.initializeHexLayer(n, aggregatePropertyMin, aggregatePropertyStep);
              });
            }
          });
        // });
      });
    }
  }

  /**
   * Initializes a hex layer
   * @param name layer name
   * @param aggregatePropertyMin min value
   * @param aggregatePropertyStep step size
   */
  private initializeHexLayer(name, aggregatePropertyMin, aggregatePropertyStep) {

    // Link layer to source
    const layer = {
      id: '',
      type: 'fill',
      source: name,
      paint: {
        'fill-color': {
          property: 'avg',
          stops: this.hexColorRamp.map((d, i) =>
            [aggregatePropertyMin + (i * aggregatePropertyStep), d])
        },
        'fill-opacity': 0.6
      }
    };
    layer['id'] = name + '-layer';
    layer['source'] = name;

    // Get ID of first layer which contains labels
    const firstSymbolId = this.getFirstLayerWithLabels(this.map);

    // Remove layer
    if (this.map.getLayer(layer['id'])) {
      this.map.removeLayer(layer['id']);
    }

    // Add layer
    // @ts-ignore
    this.map.addLayer(layer, firstSymbolId);

    // Initialize layer opacity
    if (layer['paint'].hasOwnProperty('fill-color')) {
      this.map.setPaintProperty(layer['id'], 'fill-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('line-color')) {
      this.map.setPaintProperty(layer['id'], 'line-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('heatmap-color')) {
      this.map.setPaintProperty(layer['id'], 'heatmap-opacity', this.initialOpacity / 100);
    }
    if (layer['paint'].hasOwnProperty('circle-color')) {
      this.map.setPaintProperty(layer['id'], 'circle-opacity', this.initialOpacity / 100);
    }

    // Update layer opacity
    this.opacitySubject.subscribe((e: { name, value }) => {
      const layerId = e.name + '-layer';
      if (layer.id === layerId) {
        if (layer['paint'].hasOwnProperty('fill-color')) {
          this.map.setPaintProperty(layerId, 'fill-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('line-color')) {
          this.map.setPaintProperty(layerId, 'line-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('heatmap-color')) {
          this.map.setPaintProperty(layerId, 'heatmap-opacity', e.value / 100);
        }
        if (layer['paint'].hasOwnProperty('circle-color')) {
          this.map.setPaintProperty(layerId, 'circle-opacity', e.value / 100);
        }
      }
    });

    // Check if debug mode is enabled
    if (this.debug) {
      this.map.on('click', name + '-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`value ${e.features[0]
            .properties['max_spatial_distance_15min']} / coords ${e.features[0].geometry['coordinates']}`)
          .addTo(this.map);
      });
    }
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

  //
  // Hexagon helpers
  //

  /**
   * Pre-processes raw data by clustering them into hexbins
   * @param data raw data
   * @param boundingBox bounding box
   * @param aggregateProperty property
   * @param cellSize cell size in km
   * @param hexBinLimit hex-bin limit
   * @param hexBinThreshold hex-bin threshold
   *
   * @return a geoJSON that represents polygons for each hexbin
   */
  private preprocessHexagonData(data: any, boundingBox: number[], aggregateProperty: string, cellSize: number, hexBinLimit: number, hexBinThreshold: number): any {

    // @ts-ignore
    const hexGrid = turf.hexGrid(boundingBox, cellSize);

    // perform a "spatial join" on our hexGrid geometry and our crashes point data
    const collected = this.collect(hexGrid, data, aggregateProperty, 'values', hexBinThreshold);

    // get rid of polygons with no joined data, to reduce our final output file size
    collected.features = collected.features.filter(d => {
      return d.properties.values.length > hexBinLimit;
    });

    // Count number of values and average per hexbin
    turfMeta.propEach(collected, props => {
      props.count = props.values.length || 0;
      props.avg = (props.values.reduce((a, b) => a + b, 0) / props.values.length) || 0;
      props.raw = JSON.stringify(props.values);
    });

    // Remove the "values" property from our hexBins as it's no longer needed
    turfMeta.propEach(collected, props => {
      delete props.values;
    });

    return collected;
  }

  /**
   * Assigns all point into a hexbin polygon
   * @param polygons hexagon polygons
   * @param points points
   * @param inProperty in-property
   * @param outProperty out-property
   * @param hexBinThreshold hex-bin threshold
   */
  private collect(polygons, points, inProperty, outProperty, hexBinThreshold) {
    const rtree = new RBush(6);

    const treeItems = points.features.map((item) => {
      return {
        minX: item.geometry.coordinates[0],
        minY: item.geometry.coordinates[1],
        maxX: item.geometry.coordinates[0],
        maxY: item.geometry.coordinates[1],
        property: item.properties[inProperty]
      };
    });

    rtree.load(treeItems);

    polygons.features.forEach((poly) => {

      if (!poly.properties) {
        poly.properties = {};
      }
      const bbox = turf.bbox(poly);
      const potentialPoints = rtree.search({minX: bbox[0], minY: bbox[1], maxX: bbox[2], maxY: bbox[3]});
      const values = [];
      potentialPoints.forEach((pt) => {
        // @ts-ignore
        if (booleanPointInPolygon([pt.minX, pt.minY], poly) && pt.property > hexBinThreshold) {
          // @ts-ignore
          values.push(pt.property);
        }
      });

      const properties = {};
      properties[outProperty] = values;
      poly.properties = properties;
    });

    return polygons;
  }

  //
  // Helpers
  //

  /**
   * Gets ID of first layer containing symbols
   * @param map map
   */
  private getFirstLayerWithLabels(map): string {
    const layers = map.getStyle().layers;
    let firstSymbolId = '';
    // Find the index of the first symbol layer in the map style
    layers.forEach((_, index) => {
      if (firstSymbolId === '' && layers[index].type === 'symbol') {
        firstSymbolId = layers[index].id;
      }
    });

    return firstSymbolId;
  }
}
