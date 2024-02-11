import { Server } from './setting';
import { FacilityDto, PathDto } from './type';

export const getFacilityCoordList = async () => {
  const result = await Server.get<FacilityDto[]>('place/facility/');
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

export const getRoutingCoords = async (search: string) => {
  const keyword = search.split('-').join('');
  const { data } = await Server.get<PathDto>(`path/${keyword}/`);
  return data;
};

export const getNavigationCoords = async (search: string) => {
  const keyword = search.split('-').join('');
  const { data } = await Server.get<PathDto>(`path/${keyword}/`);
  return data;
};

export const getSearchResult = async (search: string) => {
  const keyword = search.split('-').join('');
  const { data } = await Server.get<FacilityDto>(`place/facility/${keyword}/`);
  return data;
};

export const getDetailFacility = async (search: string) => {
  const keyword = search.split('-').join('');
  const { data } = await Server.get<FacilityDto>(`place/facility/${keyword}/`);
  return data;
};
