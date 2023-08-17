import { Server } from './setting';
import { IFailityReturnType, IMarkerReturnType, IPathReturnType, IRouteReturnType } from './type';

// export const getFacilityCoords = async () => {
//   const result = await Server.get<IMarkerReturnType>('place/facility');
//   const { latitude, longitude } = result.data.data.center;
//   const markers = result.data.data.markers;
//   return { markers, latitude, longitude };
// };

export const getFacilityCoordList = async () => {
  const result = await Server.get<IFailityReturnType[]>('place/facility');
  console.log('시설 전체 좌표:', result.data);
  return result.data;
};

// export const getRoutingCoords = async () => {
//   const result = await Server.get<IRouteReturnType>('api/map');
//   return result.data.data;
// };

export const getRoutingCoords = async (search: string): Promise<IPathReturnType> => {
  const keyword = search.split('-').join('');
  console.log('getRoutingCoords keyword:', keyword);
  const result = await Server.get(`path/${keyword}`);
  console.log('getRoutingCoords result:', result);
  return result.data;
};

export const getNavigationCoords = async (search: string): Promise<IPathReturnType> => {
  const keyword = search.split('-').join('');
  console.log('getNavigationCoords keyword:', keyword);
  const result = await Server.get(`path/${keyword}`);
  console.log('getNavigationCoords result:', result);
  return result.data;
};

export const getSearchResult = async (search: string) => {
  const keyword = search.split('-').join('');
  console.log('getSearchResult keyword: ', keyword);
  const result = await Server.get(`place/facility/${keyword}`);
  return result.data;
};

export const getDetailFacility = async (search: string) => {
  const keyword = search.split('-').join('');
  console.log('getDetailFacility keyword: ', keyword);
  const result = await Server.get(`place/facility/${keyword}`);
  return result.data;
};
