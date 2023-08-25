import Header from '@common/Header';
import { NextPage } from 'next';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import ReviewFooterSection from '@review/ReviewFooterSection';
import ReviewMainSection from '@review/ReviewMainSection';
import { useRouter } from 'next/router';

const ReviewPage: NextPage = () => {
  const [rating, setRating] = useState<number>(5);
  const router = useRouter();

  const [facility, setFacility] = useState('');

  useEffect(() => {
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    setFacility(query);
  }, [router]);

  const [comment, setComment] = useState('');

  return (
    <ReviewMainWrapper>
      <Header type='blue' />
      <ReviewMainSection setRating={setRating} setComment={setComment} comment={comment} />
      <ReviewFooterSection place={facility} rating={rating} comment={comment} />
    </ReviewMainWrapper>
  );
};

const ReviewMainWrapper = styled.div`
  height: 100%;
`;

export default ReviewPage;
