import { Server } from './setting';
import { IMarkerReturnType } from './type';

export const getFacilityCoords = async () => {
  const result = await Server.get<IMarkerReturnType>('api/center');
  const { latitude, longitude } = result.data.data.center;
  const markers = result.data.data.markers;
  return { markers, latitude, longitude };
};
