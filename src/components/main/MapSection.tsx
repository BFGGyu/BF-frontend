import styled from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { ELEMENT_ID } from '@constants/map';
import { useMapInfo } from 'src/hooks/useMapInfo';

const MapSection = () => {
  const { mapInfo, handleClickTag } = useMapInfo();

  return (
    <MapWrapper>
      <TagWrapper>
        {mapInfo.tagList.map((tag) => (
          <TagButton
            key={tag.id}
            style={FONT.HEADLINE2}
            type={tag.type}
            $clicked={tag.clicked}
            onClick={() => handleClickTag(tag.id)}
          >
            {tag.name}
          </TagButton>
        ))}
      </TagWrapper>
      <MapDiv id={ELEMENT_ID}></MapDiv>
    </MapWrapper>
  );
};

export default MapSection;

const MapWrapper = styled.div`
  flex-basis: 65%;
`;

const MapDiv = styled.div``;

const TagWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  z-index: 1;
  padding: 10px;
`;

interface PlaceTypeProps {
  type: string;
  $clicked: boolean;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  museum: COLOR.ORANGE,
  artGallery: COLOR.GREEN,
  exhibition: COLOR.RED
};

const TagButton = styled.div<PlaceTypeProps>`
  background-color: ${(props) => (props.$clicked ? TYPE_TO_COLOR[props.type] : 'white')};
  color: ${(props) => (props.$clicked ? 'white' : COLOR.GREY)};
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.16);
`;
