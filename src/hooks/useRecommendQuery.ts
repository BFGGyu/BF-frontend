import { useQuery } from 'react-query';

import { getRecommendPlace } from '@apis/facility';

export const useRecommendQuery = (count: number) => {
  const { data } = useQuery({
    queryKey: ['recommendPlace'],
    queryFn: () => getRecommendPlace(count)
  });

  return data;
};
