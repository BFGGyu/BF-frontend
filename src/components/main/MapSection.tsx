import COLOR from '@/constants/colors';
import FONT from '@/constants/fonts';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../../pages/Loading';

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

  const initTmap = () => {
    // map 생성
    // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    const map = new window.Tmapv2.Map('map_div', {
      center: new window.Tmapv2.LatLng(37.53084364186228, 127.078908811749), // 지도 초기 좌표
      width: '390px',
      height: '591px',
      zoom: 12
    });

    // 출발
    const startMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.519892712436906, 127.02810900563199),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 도착
    const endMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.49288934463672, 127.11971717230388),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 경로1
    const pathMarker1 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.5591696189164, 127.07389565460413),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    // 경로2
    const pathMarker2 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(37.52127761904626, 127.13346617572014),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map
    });

    setIsLoading(false);
  };

  // useEffect(() => {
  //   initTmap();
  // }, []);

  return (
    <MapWrapper>
      {/* {isLoading && <Loading />} */}
      <div style={{ display: 'flex', gap: 5, zIndex: 1 }}>
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
      </div>
      <MapDiv style={{ width: '390px', height: '591px', border: '3px solid black' }}></MapDiv>
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
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
`;
