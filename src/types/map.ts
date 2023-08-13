export interface IFacilityMarker {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  type: 'artGallery' | 'museum' | 'exhibition';
}

export interface IRouteMarker {
  id: number;
  latitude: string;
  longitude: string;
  path_id: number;
}

export interface ICoord {
  latitude: string;
  longitude: string;
}

export interface IRoute {
  id: number;
  latitude: string;
  longitude: string;
  path_id: number;
}
