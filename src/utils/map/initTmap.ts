import COLOR from '@constants/colors';
import { IFacilityMarker } from 'types/map';

interface InitTmapParams {
  facilityList: IFacilityMarker[];
  handleResetClickedTag: () => void;
  currentMap: Tmapv2.Map;
}

export const initTmap = ({ facilityList, handleResetClickedTag, currentMap }: InitTmapParams) => {
  // markerList 에 맞게 zoom level 설정
  const latlngBounds = new Tmapv2.LatLngBounds(
    new Tmapv2.LatLng(facilityList[0].latitude, facilityList[0].longitude)
  );

  // TMAP marker에 API로 가져온 marker 데이터 주입
  const newMarkers = getTmapMarkerList(facilityList, currentMap, latlngBounds);

  // marker 데이터에 맞게 지도 정렬 후 margin 추가
  const margin = {
    left: 150,
    top: 150,
    right: 150,
    bottom: 300
  };
  currentMap.fitBounds(latlngBounds, margin);

  const markerInfoWindowList = getMarkerTooltipList(newMarkers, currentMap); // TMAP marker 클릭 시 보여줄 툴팁
  const markers = getEventMarkers(newMarkers, currentMap, markerInfoWindowList); // TMP marker 이벤트핸들러 등록

  currentMap.addListener('click', () => {
    markers.map((marker) => marker.setVisible(true));
    handleResetClickedTag();
    markerInfoWindowList.map((info) => info.setVisible(false));
  });

  currentMap.addListener('touchend', () => {
    markers.map((marker) => marker.setVisible(true));
    handleResetClickedTag();
    markerInfoWindowList.map((info) => info.setVisible(false));
  });

  return markers;
};

const getTmapMarkerList = (
  markerList: IFacilityMarker[],
  currentMap: Tmapv2.Map,
  latlngBounds: Tmapv2.LatLngBounds
) => {
  const markers = markerList.map((data) => {
    latlngBounds.extend(new Tmapv2.LatLng(data.latitude, data.longitude));
    return new Tmapv2.Marker({
      position: new Tmapv2.LatLng(data.latitude, data.longitude),
      icon: `/images/${data.type}.svg`,
      iconSize: new Tmapv2.Size(30, 30),
      title: data.name,
      map: currentMap,
      id: data.type,
      animation: window.Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
      animationLength: 500
    });
  });

  return markers;
};

const getMarkerTooltipList = (markers: Tmapv2.Marker[], currentMap: Tmapv2.Map) => {
  const markerTooltipList = markers.map((currentMarker, idx) => {
    const lat = currentMarker._marker_data.options.position._lat;
    const lng = currentMarker._marker_data.options.position._lng;
    const name = currentMarker._marker_data.options.title;
    const content = `
    <div style='display: flex; align-items: center; padding: 0px 5px; background-color: ${COLOR.WHITE}; outline-offset: 0.1rem; outline: 1rem solid white;
    width: 220px; border-radius: 100px;'>
      <div style='font-size: 16px; font-weight: 500; width: 150px;'>${name}</div>
      <div style='background-color: ${COLOR.BLUE1}; color: ${COLOR.WHITE}; width: 100px; height: 40px;
      border-radius: 100px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700';
      ontouchend="function hi(){window.location.href='/map?result=${name}'};hi()">
          <a href='/map?result=${name}'>길찾기</a>
        </div>
      </div>`;

    return new Tmapv2.InfoWindow({
      position: new Tmapv2.LatLng(lat, lng), // Popup 이 표출될 맵 좌표
      align: 18,
      content: content, // Popup 표시될 text
      type: 2,
      map: currentMap,
      border: 0,
      visible: false
    });
  });

  return markerTooltipList;
};

const getEventMarkers = (
  markers: Tmapv2.Marker[],
  currentMap: Tmapv2.Map,
  markerInfoWindowList: Tmapv2.InfoWindow[]
) => {
  return markers.map((marker, idx) => {
    marker.addListener('touchend', () => {
      const lat = marker._marker_data.options.position._lat;
      const lng = marker._marker_data.options.position._lng;
      currentMap.panTo(new Tmapv2.LatLng(lat, lng));

      if (marker._status.mouse.isMouseDown) marker.setVisible(false);
      markerInfoWindowList[idx].setVisible(true);
    }),
      marker.addListener('click', () => {
        const lat = marker._marker_data.options.position._lat;
        const lng = marker._marker_data.options.position._lng;
        currentMap.panTo(new Tmapv2.LatLng(lat, lng));

        if (marker._status.mouse.mouseClickFlag) marker.setVisible(false);
        markerInfoWindowList[idx].setVisible(true);
      });
    return marker;
  });
};
