import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { IPlace } from '@@types/facility';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';

const PlaceTypeDic = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};

const Mypage = () => {
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

  const router = useRouter();

  return (
    <div>
      <MypageHeader>
        <CursorWrapper>
          <BsArrowLeft color={COLOR.GREY} size={25} onClick={() => router.back()} />
        </CursorWrapper>
        <HeaderText style={FONT.BODY1}>마이페이지</HeaderText>
        <Blank>빈칸</Blank>
      </MypageHeader>
      <ProfileSection>
        <ProfileWrapper>
          <Image src='/images/elevator.svg' alt='' width={50} height={50} />
          <UserIDText style={FONT.HEADLINE2}>사용자 아이디 님</UserIDText>
        </ProfileWrapper>
        <LogoutText style={FONT.CAPTION}>로그아웃</LogoutText>
      </ProfileSection>
      <BadgeSection>
        <TitleText style={FONT.HEADLINE1}>나의 뱃지</TitleText>
        <BadgeContainer>
          <BadgeWrapper>
            {/* 성공 했을 때와 성공안했을 때 분기처리 */}
            {/* <Image src='/images/elevator.svg' alt='' width={80} height={80} /> */}
            <div
              style={{ backgroundColor: COLOR.LINE, width: 80, height: 80, borderRadius: 16 }}
            ></div>
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </BadgeWrapper>

          <BadgeWrapper>
            <div
              style={{ backgroundColor: COLOR.LINE, width: 80, height: 80, borderRadius: 16 }}
            ></div>
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </BadgeWrapper>

          <BadgeWrapper>
            <div
              style={{ backgroundColor: COLOR.LINE, width: 80, height: 80, borderRadius: 16 }}
            ></div>
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </BadgeWrapper>

          <BadgeWrapper>
            <div
              style={{ backgroundColor: COLOR.LINE, width: 80, height: 80, borderRadius: 16 }}
            ></div>
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </BadgeWrapper>

          <BadgeWrapper>
            <div
              style={{ backgroundColor: COLOR.LINE, width: 80, height: 80, borderRadius: 16 }}
            ></div>
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </BadgeWrapper>
        </BadgeContainer>
      </BadgeSection>
      <div>
        <TitleText style={FONT.HEADLINE1}>찜한 시설</TitleText>

        {wishPlaceList.map((place) => (
          <div
            key={place.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
              // padding: '10px 20px'
            }}
          >
            <div style={{ flexBasis: '20%' }}>
              <Image src='/images/elevator.svg' alt='' width={80} height={80} />
            </div>
            <div style={{ flexBasis: '60%', paddingLeft: 20 }}>
              <PlaceName style={FONT.HEADLINE2}>{place.name}</PlaceName>
              <PlaceType style={FONT.BODY2} $type={place.type}>
                {/* {PlaceTypeDic[place.type]} */}
                {PlaceTypeDic['museum']}
              </PlaceType>
              <PlaceLocation style={FONT.BODY2}>{place.address}</PlaceLocation>
            </div>
            <HeartButton>
              <AiFillHeart color='red' size={25} />
            </HeartButton>
          </div>
        ))}
      </div>
    </div>
  );
};

const MypageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

const CursorWrapper = styled.div`
  cursor: pointer;
`;

const HeaderText = styled.div``;

const Blank = styled.div`
  color: white;
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserIDText = styled.div``;

const LogoutText = styled.div`
  color: ${COLOR.GREY};
  cursor: pointer;
`;

const PlaceName = styled.div``;

const PlaceLocation = styled.div`
  color: ${COLOR.GREY};
`;

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

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const BadgeSection = styled.div``;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TitleText = styled.div`
  padding: 20px;
`;

const BadgeName = styled.div`
  width: 60%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
`;

const HeartButton = styled.div`
  flex-basis: 20%;
  display: flex;
  justify-content: center;
`;

export default Mypage;
