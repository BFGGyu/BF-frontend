import { useQuery } from 'react-query';

import { getRecommendPlace } from '@apis/map';

export const useRecommendQuery = (count: number) => {
  const { data } = useQuery({
    queryKey: ['recommendPlace'],
    queryFn: () => getRecommendPlace(count)
  });

  return data;
};
