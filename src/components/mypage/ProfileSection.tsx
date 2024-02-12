import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { nicknameState } from '@states/user';

const ProfileSection = () => {
  const nickname = useRecoilValue(nicknameState);

  return (
    <ProfileWrapper>
      <ProfileInfo>
        <Image src='/images/elevator.svg' alt='' width={50} height={50} />
        <UserIDText style={FONT.HEADLINE2}>{nickname} 님</UserIDText>
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
  border-bottom: 8px solid rgba(239, 241, 255, 0.3);
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
