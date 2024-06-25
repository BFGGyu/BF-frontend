import { Server } from './setting';
import { PathDto } from './type';

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
