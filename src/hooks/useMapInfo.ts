import { useCallback, useEffect, useState } from 'react';

import { getFacilityCoordList } from '@apis/map';
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
    getFacilityCoordList().then((data) => {
      initTmap(data, handleResetClickedTag).then((markers: any[]) => {
        setMapInfo((mapInfo) => ({ ...mapInfo, markerList: markers }));
      });
    });
  }, [handleResetClickedTag, setMapInfo]);

  return { mapInfo, handleClickTag };
};
