export interface IMarker {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  type: 'artGallery' | 'museum' | 'exhibition';
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
