import { useCallback, useEffect, useState } from 'react';

import useCreateTMap from './useCreateTMap';

import { getFacilityCoordList } from '@apis/facility';
import { TAG_INITIAL_VALUE } from '@constants/map';
import { initTmap } from '@utils/map';
import { ITag } from 'types/map';

interface IMapInfo {
  markerList: any[];
  tagList: ITag[];
}

export const useMapInfo = () => {
  const [mapInfo, setMapInfo] = useState<IMapInfo>({
    markerList: [],
    tagList: TAG_INITIAL_VALUE
  });

  const { mapRef } = useCreateTMap();

  const handleClickTag = (tagId: number) => {
    const tag = mapInfo.tagList.filter((tag) => tag.id === tagId)[0];
    setMapInfo({
      ...mapInfo,
      markerList: mapInfo.markerList.map((marker: any) => {
        if (marker._marker_data.id === tag.type) {
          marker.setVisible(true);
        } else marker.setVisible(false);
        return marker;
      }),
      tagList: mapInfo.tagList.map((tag) =>
        tag.id === tagId ? { ...tag, clicked: true } : { ...tag, clicked: false }
      )
    });
  };

  const handleResetClickedTag = useCallback(() => {
    setMapInfo((mapInfo) => ({
      ...mapInfo,
      tagList: mapInfo.tagList.map((tag) => ({ ...tag, clicked: false }))
    }));
  }, []);

  useEffect(() => {
    const initMap = async (currentMap: Tmapv2.Map) => {
      const facilityList = await getFacilityCoordList();
      const markerList = initTmap({
        facilityList,
        handleResetClickedTag,
        currentMap
      });
      setMapInfo((mapInfo) => ({ ...mapInfo, markerList }));
    };

    if (mapRef.current) {
      initMap(mapRef.current);
    }
  }, [handleResetClickedTag, setMapInfo, mapRef]);

  return { mapInfo, handleClickTag };
};
