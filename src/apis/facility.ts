import { Server } from './setting';
import { FacilityDto } from './type';

export const getFacilityCoordList = async () => {
  const result = await Server.get<FacilityDto[]>('place/facility/');

  return result.data;
};

export const getRecommendPlace = async (count: number) => {
  const result = await getFacilityCoordList();

  return Array.from({ length: count }).map(() => result[Math.floor(Math.random() * result.length)]);
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
