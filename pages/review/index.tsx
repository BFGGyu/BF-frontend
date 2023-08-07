import Button from '@common/Button';
import Header from '@common/Header';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { NextPage } from 'next';
import { styled } from 'styled-components';

const ReviewPage: NextPage = () => {
  return (
    <ReviewMainWrapper>
      <Header />
      <TextWrapper>
        <ReviewTitle style={FONT.HEADLINE1}>이용한 경로에 대한 평가를 부탁드립니다.</ReviewTitle>
        <StarRating style={FONT.HEADLINE1}>{'⭐️'.repeat(5)}</StarRating>
        <ReviewText placeholder='자유롭게 의견을 적어주세요.' />
      </TextWrapper>
      <FooterButtonWrapper>
        <Button bgColor={COLOR.BLUE3} color={COLOR.BLUE1} height='80%'>
          건너뛰기
        </Button>
        <Button bgColor={COLOR.BLUE1} color={COLOR.BLUE3} height='80%'>
          제출하기
        </Button>
      </FooterButtonWrapper>
    </ReviewMainWrapper>
  );
};

const FooterButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  height: 10vh;
`;

const ReviewText = styled.textarea`
  width: 90%;
  height: 15%;
  font-size: 16px;
  padding: 10px;
  outline: none;
  resize: none;
`;

const TextWrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StarRating = styled.div``;

const ReviewMainWrapper = styled.div`
  border: 1px solid black;
  height: 100%;
`;

const ReviewTitle = styled.div`
  width: 70%;
  display: flex;
  text-align: center;
  margin: 0 auto;
  fiex-wrap: wrap;
`;

export default ReviewPage;
