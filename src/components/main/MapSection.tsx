import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useMarkerQuery } from './useMarkerQuery';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { TAG_INITIAL_VALUE } from '@constants/map';
import { initTmap } from '@utils/map';
import { getFacilityCoordList } from 'src/apis/map';
import { ITag } from 'types/map';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [markerList, setMarkerList] = useState<any[]>([]);
  const [tags, setTags] = useState<ITag[]>(TAG_INITIAL_VALUE);

  const handleClickTag = (tagId: number) => {
    const tag = tags.filter((tag) => tag.id === tagId)[0];
    setMarkerList((markerList) =>
      markerList.map((marker: any) => {
        if (marker._marker_data.id === tag.type) {
          marker.setVisible(true);
        } else marker.setVisible(false);
        return marker;
      })
    );
    setTags(
      tags.map((tag) => (tag.id === tagId ? { ...tag, clicked: true } : { ...tag, clicked: false }))
    );
  };

  const handleResetClickedTag = useCallback(() => {
    setTags((tags) => tags.map((tag) => ({ ...tag, clicked: false })));
  }, []);

  useEffect(() => {
    getFacilityCoordList().then((data) => {
      initTmap(data, handleResetClickedTag).then((markers: any[]) => {
        setMarkerList(markers);
      });
    });
  }, [handleResetClickedTag]);

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
