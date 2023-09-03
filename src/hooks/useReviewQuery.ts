import { getReviewList } from '@apis/review';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { IReview } from 'types/review';

export const useReviewQuery = (): IReview[] => {
  const router = useRouter();
  const query = decodeURIComponent(router.asPath.split('=')[1]);
  const { data } = useQuery(['review', query], () => getReviewList(query));
  if (data) return data;
  else return [];
};
