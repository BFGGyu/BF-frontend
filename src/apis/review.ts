import { Server } from './setting';
import { IReviewReturnType } from './type';

export const getReviewList = async (place: string) => {
  const result = await Server.get<IReviewReturnType>(`review/${place}`);
  console.log('getReviewList result.data:', result.data);
};
