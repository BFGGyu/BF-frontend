import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import { styled } from 'styled-components';

const MypageHeader = () => {
  const router = useRouter();

  return (
    <MypageHeaderWrapper>
      <CursorWrapper>
        <BsArrowLeft color={COLOR.GREY} size={25} onClick={() => router.back()} />
      </CursorWrapper>
      <HeaderText style={FONT.BODY1}>마이페이지</HeaderText>
      <Blank>
        <BsArrowLeft size={25} />
      </Blank>
    </MypageHeaderWrapper>
  );
};

const MypageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  border-bottom: 1px solid ${COLOR.LINE};
`;

const CursorWrapper = styled.div`
  cursor: pointer;
`;

const HeaderText = styled.div``;

const Blank = styled.div`
  color: white;
`;

export default MypageHeader;
