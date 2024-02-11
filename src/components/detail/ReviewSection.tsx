import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useReviewQuery } from 'src/hooks/useReviewQuery';

const ReviewSection = () => {
  const reviewList = useReviewQuery();

  const convertStar = (rating: number) => {
    const result = [false, false, false, false, false].map((data, idx) =>
      idx <= rating ? true : false
    );
    return result;
  };

  return (
    <ReviewWrapper>
      <ReviewHeader style={FONT.HEADLINE2}>방문자 리뷰 {reviewList.length} 명</ReviewHeader>
      {reviewList.map((review) => (
        <ReviewBody key={review.id}>
          <ReviewScore style={FONT.BODY2}>
            <StarRating style={FONT.HEADLINE1}>
              {convertStar(review.rating).map((star, idx) => (
                <AiFillStar
                  key={idx}
                  size={20}
                  style={star ? { color: '#FFE455' } : { color: '#EBEBEB' }}
                />
              ))}
            </StarRating>
            <ReviewCount>{review.writer}</ReviewCount>
          </ReviewScore>
          <ReviewText style={FONT.BODY2}>{review.comment}</ReviewText>
        </ReviewBody>
      ))}
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.div`
  padding: 20px;
`;

const ReviewHeader = styled.div``;

const ReviewScore = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${COLOR.GREY};
`;

const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 20px 0px;
  border-bottom: 1px solid ${COLOR.LINE};
`;
const StarRating = styled.div``;
const ReviewCount = styled.div``;
const ReviewText = styled.div``;

export default ReviewSection;
