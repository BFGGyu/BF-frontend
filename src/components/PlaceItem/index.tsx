import COLOR from '@constants/colors';
import { styled } from 'styled-components';
import Button from '../common/Button';
import InfoSection from './InfoSection';

interface IPlace {
  id: string;
  name: string;
  type: string;
  location: string;
  startTimeAt: string;
}

interface IPlaceItemProps {
  place: IPlace;
}

const PlaceItem = ({ place }: IPlaceItemProps) => {
  return (
    <SearchListWrapper key={place.id}>
      <LeftWrapper>
        <InfoSection place={place} />
      </LeftWrapper>
      <RightWrapper>
        <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE}>
          길찾기
        </Button>
      </RightWrapper>
    </SearchListWrapper>
  );
};

const LeftWrapper = styled.div`
  display: flex;
  flex-basis: 80%;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchListWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  border-color: ${COLOR.LINE};
`;

export default PlaceItem;
