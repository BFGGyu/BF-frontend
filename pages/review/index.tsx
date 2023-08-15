import Header from '@common/Header';
import { NextPage } from 'next';
import { styled } from 'styled-components';
import { useState } from 'react';
import ReviewFooterSection from 'src/components/review/ReviewFooterSection';
import ReviewMainSection from 'src/components/review/ReviewMainSection';

const ReviewPage: NextPage = () => {
  const [starCount, setStarCount] = useState<number>(5);

  return (
    <ReviewMainWrapper>
      <Header type='blue' />
      <ReviewMainSection setStarCount={setStarCount} />
      <ReviewFooterSection starCount={starCount} />
    </ReviewMainWrapper>
  );
};

const ReviewMainWrapper = styled.div`
  border: 1px solid black;
  height: 100%;
`;

export default ReviewPage;
