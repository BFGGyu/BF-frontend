import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '@pages/Loading';
import { initTmap } from '@utils/maps';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tags, setTags] = useState([
    {
      id: 0,
      type: '박물관',
      clicked: false
    },
    {
      id: 1,
      type: '미술관',
      clicked: false
    },
    {
      id: 2,
      type: '전시회',
      clicked: false
    }
  ]);

  const handleClickTag = (id: number) => {
    setTags(
      tags.map((tag) => (tag.id === id ? { ...tag, clicked: true } : { ...tag, clicked: false }))
    );
  };

  useEffect(() => {
    initTmap();
  }, []);

  return (
    <MapWrapper>
      <TagWrapper>
        {tags.map((tag) => (
          <TagButton
            key={tag.id}
            style={FONT.HEADLINE2}
            type={tag.type}
            clicked={tag.clicked}
            onClick={() => handleClickTag(tag.id)}
          >
            {tag.type}
          </TagButton>
        ))}
      </TagWrapper>
      {/* <MapDiv style={{ width: '390px', height: '591px', border: '3px solid black' }}></MapDiv> */}
      <MapDiv ref={mapRef} id='map_div'></MapDiv>
    </MapWrapper>
  );
};

export default MapSection;

const MapWrapper = styled.div`
  flex-basis: 50%;
`;

const MapDiv = styled.div`
  position: absolute;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  z-index: 1;
  padding: 10px;
`;

interface PlaceTypeProps {
  type: string;
  clicked: boolean;
}

type ObjType = {
  [index: string]: string;
};

const TYPE_TO_COLOR: ObjType = {
  박물관: COLOR.ORANGE,
  미술관: COLOR.GREEN,
  전시회: COLOR.RED
};

const TagButton = styled.div<PlaceTypeProps>`
  background-color: ${(props) => (props.clicked ? TYPE_TO_COLOR[props.type] : 'white')};
  color: ${(props) => (props.clicked ? 'white' : COLOR.GREY)};
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.16);
`;
