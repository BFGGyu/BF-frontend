import { Server } from './setting';
import { ReviewDto } from './type';

export const getReviewList = async (place: string) => {
  const result = await Server.get<ReviewDto[]>(`review/${place}/`);
  return result.data;
};

export const submitReview = async (
  place: string,
  writer: string,
  rating: number,
  comment: string
) => {
  await Server.post<ReviewDto>(`review/${place}/`, {
    writer,
    rating,
    comment
  });
};
