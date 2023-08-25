import { IPlace } from 'types/facility';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { styled } from 'styled-components';

const PlaceTypeDic = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};
const WishPlaceSection = () => {
  const [wishPlaceList, setWishPlaceList] = useState<IPlace[]>([
    {
      id: '0',
      name: '국립 고궁 박물관',
      type: 'museum',
      address: '서울 종로구 세종로',
      opening_time: '10:00'
    },
    {
      id: '1',
      name: '국립 고궁 박물관',
      type: 'museum',
      address: '서울 종로구 세종로',
      opening_time: '10:00'
    }
  ]);

  return (
    <WishPlaceSectionWrapper>
      <TitleText style={FONT.HEADLINE1}>찜한 시설</TitleText>

      {wishPlaceList.map((place) => (
        <WishPlaceWrapper key={place.id}>
          <WishPlaceImage>
            <Image src='/images/elevator.svg' alt='' width={80} height={80} />
          </WishPlaceImage>
          <WishPlaceInfo>
            <PlaceName style={FONT.HEADLINE2}>{place.name}</PlaceName>
            <PlaceType style={FONT.BODY2} $type={place.type}>
              {/* {PlaceTypeDic[place.type]} */}
              {PlaceTypeDic['museum']}
            </PlaceType>
            <PlaceLocation style={FONT.BODY2}>{place.address}</PlaceLocation>
          </WishPlaceInfo>
          <HeartButton>
            <AiFillHeart color='red' size={25} />
          </HeartButton>
        </WishPlaceWrapper>
      ))}
    </WishPlaceSectionWrapper>
  );
};

interface PlaceTypeProps {
  $type: string;
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
  color: ${(props) => TYPE_TO_COLOR[props.$type]};
`;

const PlaceName = styled.div``;

const PlaceLocation = styled.div`
  color: ${COLOR.GREY};
`;

const WishPlaceSectionWrapper = styled.div``;

const TitleText = styled.div`
  padding: 20px;
`;

const WishPlaceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WishPlaceImage = styled.div`
  flex-basis: 20%;
`;

const WishPlaceInfo = styled.div`
  flex-basis: 60%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const HeartButton = styled.div`
  flex-basis: 20%;
  display: flex;
  justify-content: center;
`;

export default WishPlaceSection;
