import { Server } from './setting';
import { IReviewReturnType } from './type';

export const getReviewList = async (place: string) => {
  const result = await Server.get<IReviewReturnType[]>(`review/${place}`);
  console.log('getReviewList result.data:', result.data);
  return result.data;
};

export const submitReview = async (
  place: string,
  writer: string,
  rating: number,
  comment: string
) => {
  const result = await Server.post<IReviewReturnType>(`review/${place}`, {
    writer,
    rating,
    comment
  });
  console.log('submitReview result.data:', result.data);
};
