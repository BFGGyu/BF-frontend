import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import React, { useState } from 'react';
import { styled } from 'styled-components';

interface IBadge {
  id: string;
  imageSrc: string;
  name: string;
}

const BadgeSection = () => {
  const [badgeList, setBadgetList] = useState<IBadge[]>([
    {
      id: '0',
      imageSrc: '/images/elevator.svg',
      name: '어디든지 완전정복'
    },
    {
      id: '1',
      imageSrc: '/images/elevator.svg',
      name: '어디든지 완전정복'
    },
    {
      id: '2',
      imageSrc: '/images/elevator.svg',
      name: '어디든지 완전정복'
    },
    {
      id: '3',
      imageSrc: '/images/elevator.svg',
      name: '어디든지 완전정복'
    },
    {
      id: '4',
      imageSrc: '/images/elevator.svg',
      name: '어디든지 완전정복'
    }
  ]);

  return (
    <BadgeWrapper>
      <TitleText style={FONT.HEADLINE1}>나의 뱃지</TitleText>
      <BadgeContainer>
        {badgeList.map((badge) => (
          <Badge key={badge.id}>
            {/* 성공 했을 때와 성공안했을 때 분기처리 */}
            {/* <Image src='/images/elevator.svg' alt='' width={80} height={80} /> */}
            <NotCompletedBadge />
            <BadgeName style={FONT.BODY2}>어디든지 완전정복</BadgeName>
          </Badge>
        ))}
      </BadgeContainer>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div``;

const TitleText = styled.div`
  padding: 20px;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NotCompletedBadge = styled.div`
  background-color: ${COLOR.LINE};
  width: 80px;
  height: 80px;
  border-radius: 16px;
`;

const BadgeName = styled.div`
  width: 60%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
`;

export default BadgeSection;
