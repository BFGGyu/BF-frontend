import { BsArrowLeft } from 'react-icons/bs';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import PlaceInfoSection from '@detail/PlaceInfoSection';
import ReviewSection from '@detail/ReviewSection';
import useQueryString from 'src/hooks/useQueryString';
import { useSearchQuery } from 'src/hooks/useSearchQuery';

const DetailPage = () => {
  const result = useQueryString();
  const selectedPlace = useSearchQuery(result);

  return (
    <>
      {selectedPlace && (
        <DetailWrapper>
          <HeaderWrapper onClick={() => window.history.back()}>
            <BsArrowLeft color={COLOR.GREY} size={25} />
            <div style={FONT.BODY1}>{selectedPlace.name}</div>
          </HeaderWrapper>
          <PlaceInfoSection selectedPlace={selectedPlace} result={result} />
          <ReviewSection />
        </DetailWrapper>
      )}
    </>
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
  cursor: pointer;
`;

export default DetailPage;
