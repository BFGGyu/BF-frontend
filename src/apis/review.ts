import { Server } from './setting';
import { IReviewReturnType } from './type';

export const getReviewList = async (place: string) => {
  const result = await Server.get<IReviewReturnType[]>(`review/${place}/`);
  return result.data;
};

export const submitReview = async (
  place: string,
  writer: string,
  rating: number,
  comment: string
) => {
  await Server.post<IReviewReturnType>(`review/${place}/`, {
    writer,
    rating,
    comment
  });
};
