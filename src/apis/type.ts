import { ICoord, IFacilityMarker, IRouteMarker } from '@@types/map';

export interface IFailityReturnType {
  id: number;
  name: string;
  type: 'artGallery' | 'museum' | 'exhibition';
  contact: string;
  address: string;
  opening_time: string;
  closing_time: string;
  latitude: string;
  longitude: string;
  imageSrc: string;
}

export interface IMarkerReturnType {
  [key: string]: {
    path_id: number;
    center: {
      latitude: string;
      longitude: string;
    };
    markers: IFacilityMarker[];
  };
}

export interface IRouteReturnType {
  [key: string]: {
    path_id: 1;
    center: ICoord;
    departure: ICoord;
    arrival: ICoord;
    markers: IRouteMarker[];
    routes: IRouteMarker[];
  };
}

export interface LoginReturnType {
  nickname: string;
  access_token: string;
  refresh_token: string;
}

export interface IReviewReturnType {
  id: number;
  departure: string;
  arrival: string;
  writer: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  path_id: number;
}
