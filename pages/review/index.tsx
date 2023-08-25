import Header from '@common/Header';
import { NextPage } from 'next';
import { styled } from 'styled-components';
import { useState } from 'react';
import ReviewFooterSection from '@review/ReviewFooterSection';
import ReviewMainSection from '@review/ReviewMainSection';

const ReviewPage: NextPage = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  return (
    <ReviewMainWrapper>
      <Header type='blue' />
      <ReviewMainSection setRating={setRating} setComment={setComment} comment={comment} />
      <ReviewFooterSection rating={rating} comment={comment} />
    </ReviewMainWrapper>
  );
};

const ReviewMainWrapper = styled.div`
  height: 100%;
`;

export default ReviewPage;
