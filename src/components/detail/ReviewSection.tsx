import { getReviewList } from '@apis/review';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { styled } from 'styled-components';
import { IReview } from 'types/review';

const ReviewSection = () => {
  const router = useRouter();
  const [reviewList, setReviewList] = useState<IReview[]>([]);

  const convertStar = (rating: number) => {
    const result = [false, false, false, false, false].map((data, idx) =>
      idx <= rating ? true : false
    );
    return result;
  };

  useEffect(() => {
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    getReviewList(query).then((data) => {
      setReviewList(data);
    });
  }, [router]);

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
