import Header from '@common/Header';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { NextPage } from 'next';
import { styled } from 'styled-components';

const ReviewPage: NextPage = () => {
  return (
    <ReviewMainWrapper>
      <Header />
      <div
        style={{
          height: '85vh',
          backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20
        }}
      >
        <ReviewTitle style={FONT.HEADLINE1}>이용한 경로에 대한 평가를 부탁드립니다.</ReviewTitle>
        <div style={FONT.HEADLINE1}>{'⭐️'.repeat(5)}</div>
        <textarea
          style={{
            width: '90%',
            height: '15%',
            fontSize: 16,
            padding: 10,
            outline: 'none',
            resize: 'none'
          }}
          placeholder='자유롭게 의견을 적어주세요.'
        />
      </div>
    </ReviewMainWrapper>
  );
};

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
