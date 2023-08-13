import { IMarker } from '@@types/map';

export interface IMarkerReturnType {
  [key: string]: {
    path_id: number;
    center: {
      latitude: string;
      longitude: string;
    };
    markers: IMarker[];
  };
}
