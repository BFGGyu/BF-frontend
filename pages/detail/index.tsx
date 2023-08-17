import Button from '@common/Button';
import InfoSection from 'src/components/place/InfoSection';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { styled } from 'styled-components';
import { IPlace } from '@@types/facility';
import { IFacilityMarker } from '@@types/map';
import { useRouter } from 'next/router';

const DetailPage = () => {
  const router = useRouter();
  const [result, setResult] = useState('');
  const [reviewList, setReviewList] = useState([
    { id: 0, starRate: 5, count: 4, text: '편안하고 안전한 길이였어요.' },
    { id: 1, starRate: 1, count: 3, text: '불편한 길이였어요.' },
    { id: 2, starRate: 4, count: 2, text: '좋은데요?' },
    {
      id: 3,
      starRate: 5,
      count: 1,
      text: '편안하고 안전한 길이였어요. 근데 만약에 텍스트가 길어지면 자를지 그냥 보여줄지?'
    }
  ]);

  const handleClickNavigation = () => {
    router.push('/navigation', {
      query: { result }
    });
  };

  useEffect(() => {
    const query = decodeURIComponent(router.asPath.split('=')[1]);
    setResult(query);
  }, [router]);

  return (
    <DetailWrapper>
      <HeaderWrapper>
        <BsArrowLeft color={COLOR.GREY} size={25} />
        <div style={FONT.BODY1}>고궁 박물관</div>
      </HeaderWrapper>
      <ImageSection></ImageSection>
      <PlaceInfomation>
        <LeftWrapper>
          <InfoSection />
        </LeftWrapper>
        <RightWrapper>
          <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} onClick={handleClickNavigation}>
            길찾기
          </Button>
        </RightWrapper>
      </PlaceInfomation>
      <ReviewSection>
        <ReviewHeader style={FONT.HEADLINE2}>방문자 리뷰 {reviewList.length} 명</ReviewHeader>
        {reviewList.map((review) => (
          <ReviewBody key={review.id}>
            <ReviewScore style={FONT.BODY2}>
              <StarRating>
                {'⭐️'.repeat(review.starRate)}
                {'🍎'.repeat(5 - review.starRate)}
              </StarRating>
              <ReviewCount>{review.count}번째 방문자</ReviewCount>
            </ReviewScore>
            <ReviewText style={FONT.BODY2}>{review.text}</ReviewText>
          </ReviewBody>
        ))}
      </ReviewSection>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  gap: 10px;
  height: 10vh;
`;

const ImageSection = styled.div`
  height: 20vh;
  background-color: ${COLOR.GREY};
`;

const PlaceInfomation = styled.div`
  display: flex;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

const ReviewSection = styled.div`
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

export default DetailPage;
