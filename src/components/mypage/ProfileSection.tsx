import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import Image from 'next/image';
import { styled } from 'styled-components';

const ProfileSection = () => {
  return (
    <ProfileWrapper>
      <ProfileInfo>
        <Image src='/images/elevator.svg' alt='' width={50} height={50} />
        <UserIDText style={FONT.HEADLINE2}>사용자 아이디 님</UserIDText>
      </ProfileInfo>
      <LogoutText style={FONT.CAPTION}>로그아웃</LogoutText>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserIDText = styled.div``;

const LogoutText = styled.div`
  color: ${COLOR.GREY};
  cursor: pointer;
`;

export default ProfileSection;
