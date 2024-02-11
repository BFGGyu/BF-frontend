import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';

interface IReviewSectionProps {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
}

const ReviewMainSection = ({ setRating, setComment, comment }: IReviewSectionProps) => {
  const [starRatingList, setStarRatingList] = useState([true, true, true, true, true]);

  const handleClickStar = (rating: number) => {
    const result = [false, false, false, false, false].map((data, idx) =>
      idx <= rating ? true : false
    );
    setStarRatingList(result);
    setRating(result.filter((data) => data === true).length);
  };

  return (
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
      <ReviewText
        placeholder='자유롭게 의견을 적어주세요.'
        value={comment}
        onChange={(e: any) => setComment(e.target.value)}
      />
      <Image src='/images/reviewImage.svg' alt='' width={300} height={100} />
    </TextWrapper>
  );
};

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

const ReviewTitle = styled.div`
  width: 70%;
  display: flex;
  text-align: center;
  margin: 0 auto;
  fiex-wrap: wrap;
`;

export default ReviewMainSection;
