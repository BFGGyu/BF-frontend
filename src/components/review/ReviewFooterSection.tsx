import Button from '@common/Button';
import COLOR from '@constants/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import FONT from '@constants/fonts';
import { submitReview } from '@apis/review';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '@states/user';

const notifySubmitReview = () =>
  toast.success('제출이 완료되었습니다. 감사합니다 😎', {
    duration: 1000,
    style: {
      ...FONT.HEADLINE2,
      border: COLOR.BLUE3,
      backgroundColor: COLOR.BLUE3,
      color: COLOR.BLACK
    },
    iconTheme: {
      primary: COLOR.BLUE1,
      secondary: COLOR.WHITE
    }
  });

interface IReviewFooterSectionProps {
  place: string;
  rating: number;
  comment: string;
}

const ReviewFooterSection = ({ place, rating, comment }: IReviewFooterSectionProps) => {
  const router = useRouter();
  const writer = useRecoilValue(nicknameState);

  const handleSubmitReview = () => {
    // TODO: 리뷰 제출 API 연동
    notifySubmitReview();
    submitReview(place, writer, rating, comment);
    setTimeout(() => router.push('/main'), 1000);
  };

  return (
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
      <Toaster position='top-center' reverseOrder={false} />
    </FooterButtonWrapper>
  );
};

const FooterButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  height: 10vh;
`;

export default ReviewFooterSection;
