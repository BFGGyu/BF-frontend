import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import Image from 'next/image';
import styled from 'styled-components';

const FooterSection = () => {
  return (
    <FooterWrapper>
      <PlaceWrapper>
        <PlaceItem>
          <IconWrapper>
            <Image src='/images/wheelChair.svg' width={30} height={30} />
            <Image src='/images/elevator.svg' width={30} height={30} />
            <Image src='/images/slope.svg' width={30} height={30} />
          </IconWrapper>
          <TextWrapper>
            <PlaceName style={FONT.HEADLINE2}>국립고궁 박물관</PlaceName>
            <PlaceType style={FONT.BODY2}>박물관</PlaceType>
            <PlaceLocation style={FONT.BODY2}>서울 종로구 세종로</PlaceLocation>
          </TextWrapper>

          <RouteButton style={FONT.HEADLINE2}>길찾기</RouteButton>
        </PlaceItem>
      </PlaceWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: green;
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlaceWrapper = styled.div`
  background-color: blue;
  height: 100%;
  width: 90%;
  display: flex;
  gap: 10px;
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

const PlaceType = styled.div`
  color: ${COLOR.ORANGE};
`;

const PlaceLocation = styled.div``;

const RouteButton = styled.div`
  background-color: ${COLOR.BLUE1};
  color: white;
  padding: 10px;
  width: 60%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default FooterSection;
