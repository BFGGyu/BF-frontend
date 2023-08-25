import { FacilityType } from './facility';

export interface IFacilityMarker {
  id: number;
  name: string;
  contact: string;
  address: string;
  opening_time: string;
  closing_time: string;
  latitude: string;
  longitude: string;
  imageSrc: string;
  type: FacilityType;
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

export interface ITotalRouteResult {
  distance: string;
  duration: number;
}

export interface IStation {
  departure: string;
  arrival: string;
}
