import Header from '@common/Header';
import COLOR from '@constants/colors';
import { NextPage } from 'next';
import { styled } from 'styled-components';

const ReviewPage: NextPage = () => {
  return (
    <ReviewMainWrapper>
      <Header />
    </ReviewMainWrapper>
  );
};

const ReviewMainWrapper = styled.div`
  border: 1px solid black;
  height: 100%;
`;

export default ReviewPage;
