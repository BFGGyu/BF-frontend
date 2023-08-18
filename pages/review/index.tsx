import Header from '@common/Header';
import { NextPage } from 'next';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import ReviewFooterSection from '@review/ReviewFooterSection';
import ReviewMainSection from '@review/ReviewMainSection';
import { useRouter } from 'next/router';

interface IPostReview {
  place: string;
  writer: string;
  rating: number;
  comment: string;
}

const ReviewPage: NextPage = () => {
  const [rating, setRating] = useState<number>(5);
  const router = useRouter();

  const [facility, setFacility] = useState('');

  useEffect(() => {
    console.log('review router:', router);
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    console.log('review query:', query);
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
  border: 1px solid black;
  height: 100%;
`;

export default ReviewPage;
