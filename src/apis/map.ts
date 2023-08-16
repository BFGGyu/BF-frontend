import { Server } from './setting';
import { IMarkerReturnType, IRouteReturnType } from './type';

export const getFacilityCoords = async () => {
  const result = await Server.get<IMarkerReturnType>('api/center');
  const { latitude, longitude } = result.data.data.center;
  const markers = result.data.data.markers;
  return { markers, latitude, longitude };
};

export const getRoutingCoords = async () => {
  const result = await Server.get<IRouteReturnType>('api/map');
  return result.data.data;
};

export const getNavigationCoords = async () => {
  const result = await Server.get<IRouteReturnType>('api/path');
  return result.data.data;
};

export const getSearchResult = async (keyword: string) => {
  const result = await Server.get(`place/facility/${keyword}`);
  return result.data;
};
