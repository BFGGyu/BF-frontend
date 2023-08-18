import { IFacilityMarker } from '@@types/map';
import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { changeMarker, initTmap } from '@utils/map';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { getFacilityCoordList } from 'src/apis/map';
import styled from 'styled-components';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<IFacilityMarker[]>([]);
  // const [markerList, setMarkerList] = useState<IMarker[]>([
  //   {
  //     id: 0,
  //     latitude: '37.519892712436906',
  //     longitude: '127.02810900563199',
  //     name: '고궁1',
  //     type: 'artGallery'
  //   },
  //   {
  //     id: 1,
  //     latitude: '37.53288934463672',
  //     longitude: '127.11971717230388',
  //     name: '고궁2',
  //     type: 'artGallery'
  //   },
  //   {
  //     id: 2,
  //     latitude: '37.52127761904626',
  //     longitude: '127.13346617572014',
  //     name: '국립고궁박물관',
  //     type: 'museum'
  //   },
  //   {
  //     id: 3,
  //     latitude: '37.5591696189164',
  //     longitude: '127.07389565460413',
  //     name: '국립현대미술관',
  //     type: 'exhibition'
  //   }
  // ]);

  const [tags, setTags] = useState([
    {
      id: 0,
      type: 'museum',
      name: '박물관',
      clicked: false
    },
    {
      id: 1,
      type: 'artGallery',
      name: '미술관',
      clicked: false
    },
    {
      id: 2,
      type: 'exhibition',
      name: '전시회',
      clicked: false
    }
  ]);

  const handleClickTag = (id: number) => {
    setTags(
      tags.map((tag) => (tag.id === id ? { ...tag, clicked: true } : { ...tag, clicked: false }))
    );
  };

  useEffect(() => {
    const tag = tags.filter((tag) => tag.clicked === true);
    if (tag.length) {
      console.log('markersRef:', markersRef);
      changeMarker(tag[0].type, markersRef.current);
    }
  }, [tags]);

  useEffect(() => {
    // 서버 연결
    getFacilityCoordList().then((data) => {
      console.log('MapSection 연결:', data);
      initTmap(data).then((markers: IFacilityMarker[]) => {
        markersRef.current = markers;
      });
    });
  }, []);

  return (
    <MapWrapper>
      <TagWrapper>
        {tags.map((tag) => (
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
