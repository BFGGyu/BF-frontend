declare global {
  interface Window {
    Tmapv2: typeof Tmapv2;
  }
}

declare namespace Tmapv2 {
  /** Projection namespace */
  declare namespace Projection {
    class convertEPSG3857ToWGS84GEO {
      _lat: number;
      _lng: number;

      constructor(point: Point);
    }
  }

  /** LatLng class */
  class LatLng {
    constructor(lat: string | number, lng: string | number);
    distanceTo(latLng: LatLng): number;
  }

  /** Size class */
  class Size {
    constructor(width: string | number, height: string | number);
  }

  /** Map class */
  class Map {
    constructor(element: string | HTMLElement, options: MapOptions);
    destroy(): void;
    fitBounds(latlngBounds: LatLngBounds, margin: Record<string, number>): void;
    addListener(event: string, eventListener: () => void): void;
    panTo(latLng: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    width: string | number;
    height: string | number;
    zoom: number;
    pinchZoom?: boolean;
    scrollwheel?: boolean;
    zoomControl?: boolean;
    [key: string]: any;
  }

  /** Marker class */
  class Marker {
    _marker_data: { options: { title: string; position: { _lat: number; _lng: number } } };
    _status: { mouse: { isMouseDown: boolean; mouseClickFlag: boolean; [key: string]: boolean } };

    constructor(options: MarkerParams);
    addListener(event: string, eventListener: () => void): void;
    setVisible(visible: boolean): void;
    setPosition(latlng: LatLng): void;
  }

  const MarkerOptions = {
    ANIMATE_BOUNCE,
    ANIMATE_BOUNCE_ONCE,
    ANIMATE_FADEIN,
    ANIMATE_DROP,
    ANIMATE_FLICKER,
    ANIMATE_BALLOON
  };

  interface MarkerParams {
    position: InstanceType<LatLng>;
    icon?: string;
    iconSize?: InstanceType<Size>;
    title?: string;
    map?: Tmapv2.Map;
    id?: string;
    animation?: MarkerOptions;
    animationLength?: number;
    [key: string]: any;
  }

  /** InfoWindow class */
  class InfoWindow {
    constructor(options: InfoWindowParams);
    setVisible(visible: boolean): void;
  }

  interface InfoWindowParams {
    position: InstanceType<LatLng>;
    align: 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;
    content: string;
    type: 1 | 2;
    map: Tmapv2.Map;
    border: 0;
    visible: boolean;
    [key: string]: any;
  }

  /** LatLngBounds class */
  class LatLngBounds {
    constructor(latlng: LatLng);
    extend(latlng: LatLng): void;
  }

  /** Point class */
  class Point {
    constructor(x: number, y: number);
  }

  /** Polyline class */
  class Polyline {
    constructor(polylineParams: PolylineParams);
  }

  interface PolylineParams {
    path: LatLng[];
    strokeColor: string;
    strokeWeight: number;
    map: Tmapv2.Map;
    [key: string]: any;
  }
}
