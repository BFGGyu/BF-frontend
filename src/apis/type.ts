import { ICoord, IFacilityMarker, IRouteMarker } from '@@types/map';

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
