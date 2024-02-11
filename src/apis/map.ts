import { Server } from './setting';
import { IFacilityReturnType, IMarkerReturnType, IPathReturnType, IRouteReturnType } from './type';

export const getFacilityCoordList = async () => {
  const result = await Server.get<IFacilityReturnType[]>('place/facility/');
  return result.data;
};

export const getRecommendPlace = async (count: number) => {
  const result = await getFacilityCoordList();
  const recommendPlaceList = [];
  for (let i = 0; i < count; i++) {
    const newPlace = result.splice(Math.floor(Math.random() * result.length), 1)[0];
    recommendPlaceList.push(newPlace);
  }
  return recommendPlaceList;
};

export const getRoutingCoords = async (search: string): Promise<IPathReturnType> => {
  const keyword = search.split('-').join('');
  const result = await Server.get(`path/${keyword}/`);
  return result.data;
};

export const getNavigationCoords = async (search: string): Promise<IPathReturnType> => {
  const keyword = search.split('-').join('');
  const result = await Server.get(`path/${keyword}/`);
  return result.data;
};

export const getSearchResult = async (search: string) => {
  const keyword = search.split('-').join('');
  try {
    const result = await Server.get(`place/facility/${keyword}/`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailFacility = async (search: string) => {
  const keyword = search.split('-').join('');
  const result = await Server.get(`place/facility/${keyword}/`);
  return result.data;
};
