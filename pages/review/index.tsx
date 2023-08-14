import Button from '@common/Button';
import Header from '@common/Header';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { styled } from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { useRef, useState } from 'react';
import Image from 'next/image';

const ReviewPage: NextPage = () => {
  const router = useRouter();

  const handleSubmitReview = () => {
    // 제출하기 버튼 클릭 시 API 호출 후 라우팅. 제출 완료 토스트 메세지?
    router.push('/main');
  };

  const starCount = useRef(5);
  const [starRatingList, setStarRatingList] = useState([true, true, true, true, true]);

  const handleClickStar = (rating: number) => {
    const result = [false, false, false, false, false].map((data, idx) =>
      idx <= rating ? true : false
    );
    setStarRatingList(result);
    starCount.current = result.filter((data) => data === true).length;
  };

  return (
    <ReviewMainWrapper>
      <Header type='blue' />
      <TextWrapper>
        <ReviewTitle style={FONT.HEADLINE1}>이용한 경로에 대한 평가를 부탁드립니다.</ReviewTitle>
        <StarRating style={FONT.HEADLINE1}>
          {starRatingList.map((star, idx) => (
            <AiFillStar
              key={idx}
              size={50}
              style={starRatingList[idx] ? { color: COLOR.BLUE1 } : { color: COLOR.BLUE3 }}
              onClick={() => handleClickStar(idx)}
            />
          ))}
        </StarRating>
        <ReviewText placeholder='자유롭게 의견을 적어주세요.' />
        <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
      </TextWrapper>
      <FooterButtonWrapper>
        <Button
          bgColor={COLOR.BLUE3}
          color={COLOR.BLUE1}
          height='80%'
          onClick={() => router.push('/main')}
        >
          건너뛰기
        </Button>
        <Button bgColor={COLOR.BLUE1} color={COLOR.BLUE3} height='80%' onClick={handleSubmitReview}>
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
