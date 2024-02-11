import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getRecommendPlace } from '@apis/map';
import Button from '@common/Button';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import SCREEN_SIZE from '@constants/sizes';
import { handleClickMovePage } from '@utils/map';

const PlaceTypeDic = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};

const FooterSection = () => {
  const router = useRouter();
  const { data: recommendPlaces } = useQuery(['recommendPlaces', 2], () => getRecommendPlace(2));

  return (
    <FooterWrapper>
      <PlaceWrapper>
        {recommendPlaces &&
          recommendPlaces.map((place, idx) => (
            <PlaceItem key={idx}>
              <IconWrapper>
                <Image src='/images/wheelChair.svg' alt='wheelChair' width={30} height={30} />
                <Image src='/images/elevator.svg' alt='elevator' width={30} height={30} />
                <Image src='/images/slope.svg' alt='slope' width={30} height={30} />
              </IconWrapper>
              <TextWrapper>
                <PlaceName>{place.name}</PlaceName>
                <PlaceType style={FONT.BODY2} type={place.type}>
                  {PlaceTypeDic[place.type]}
                </PlaceType>
                <PlaceLocation style={FONT.BODY2}>{place.address.slice(0, 10)}</PlaceLocation>
              </TextWrapper>
              <Button
                width='80%'
                bgColor={COLOR.BLUE1}
                color={COLOR.WHITE}
                onClick={() => handleClickMovePage(router, '/map', place.name)}
              >
                길찾기
              </Button>
            </PlaceItem>
          ))}
      </PlaceWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  height: 25vh;
  width: ${SCREEN_SIZE.WIDTH};
  display: flex;
  justify-content: center;
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
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  box-shadow: 0px 4px 16px 0px rgba(43, 84, 203, 0.26);
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

const PlaceName = styled.div`
  // font-size: 5vw;
  fontsize: 12px;
  font-weight: 700;
`;

interface PlaceTypeProps {
  type: string;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  museum: COLOR.ORANGE,
  artGallery: COLOR.GREEN,
  exhibition: COLOR.RED
};

const PlaceType = styled.div<PlaceTypeProps>`
  color: ${(props) => TYPE_TO_COLOR[props.type]};
`;

const PlaceLocation = styled.div`
  font-size: 20%;
`;

export default FooterSection;
