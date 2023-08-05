import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const FooterSection = () => {
  const [recommendPlaces, setRecommendPlaces] = useState([
    {
      id: '0',
      name: '국립 고궁 박물관',
      type: '박물관',
      location: '서울 종로구 세종로'
    },
    {
      id: 1,
      name: '국립 현대 미술관',
      type: '미술관',
      location: '서울 종로구 소격동'
    }
  ]);

  return (
    <FooterWrapper>
      <PlaceWrapper>
        {recommendPlaces.map((place, idx) => (
          <PlaceItem key={idx}>
            <IconWrapper>
              <Image src='/images/wheelChair.svg' width={30} height={30} />
              <Image src='/images/elevator.svg' width={30} height={30} />
              <Image src='/images/slope.svg' width={30} height={30} />
            </IconWrapper>
            <TextWrapper>
              <PlaceName style={FONT.HEADLINE2}>{place.name}</PlaceName>
              <PlaceType style={FONT.BODY2} type={place.type}>
                {place.type}
              </PlaceType>
              <PlaceLocation style={FONT.BODY2}>{place.location}</PlaceLocation>
            </TextWrapper>
            <Button width='60%' bgColor={COLOR.BLUE1} color={COLOR.WHITE}>
              길찾기
            </Button>
          </PlaceItem>
        ))}
      </PlaceWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  height: 35vh;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5vh;
  z-index: 1;
`;

const PlaceWrapper = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const PlaceItem = styled.div`
  background-color: white;
  height: 90%;
  width: 45%;
  border: 3px solid black;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  flexbasis: 20%;
  gap: 5px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  gap: 5px;
`;

const PlaceName = styled.div``;

interface PlaceTypeProps {
  type: string;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  박물관: COLOR.ORANGE,
  미술관: COLOR.GREEN,
  전시회: COLOR.RED
};

const PlaceType = styled.div<PlaceTypeProps>`
  color: ${(props) => TYPE_TO_COLOR[props.type]};
`;

const PlaceLocation = styled.div``;

export default FooterSection;
