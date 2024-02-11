import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import { IFacilityMarker } from 'types/map';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

export const initTmap = async (
  markerList: IFacilityMarker[],
  handleResetClickedTag: () => void
) => {
  // TMAP 생성
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
    width: SCREEN_SIZE.WIDTH,
    height: '566px',
    zoom: 8,
    pinchZoom: true,
    scrollwheel: true,
    zoomControl: true
  });

  // markerList 에 맞게 zoom level 설정
  const latlngBounds = new window.Tmapv2.LatLngBounds(
    new window.Tmapv2.LatLng(markerList[0].latitude, markerList[0].longitude)
  );

  // TMAP marker에 API로 가져온 marker 데이터 주입
  const newMarkers = getTmapMarkerList(markerList, CURRENT_MAP, latlngBounds);

  // marker 데이터에 맞게 지도 정렬 후 margin 추가
  const margin = {
    left: 150,
    top: 150,
    right: 150,
    bottom: 300
  };
  CURRENT_MAP.fitBounds(latlngBounds, margin);

  const markerTooltipList = getMarkerTooltipList(newMarkers, CURRENT_MAP); // TMAP marker 클릭 시 보여줄 툴팁
  const markers = getEventMarkers(newMarkers, CURRENT_MAP, markerTooltipList); // TMP marker 이벤트핸들러 등록

  CURRENT_MAP.addListener('click', () => {
    markers.map((marker) => marker.setVisible(true));
    handleResetClickedTag();
    markerTooltipList.map((info) => info.setVisible(false));
  });

  CURRENT_MAP.addListener('touchend', () => {
    markers.map((marker) => marker.setVisible(true));
    handleResetClickedTag();
    markerTooltipList.map((info) => info.setVisible(false));
  });

  return markers;
};

const getTmapMarkerList = (markerList: IFacilityMarker[], CURRENT_MAP: any, latlngBounds: any) => {
  const markers = markerList.map((data) => {
    latlngBounds.extend(new window.Tmapv2.LatLng(data.latitude, data.longitude));
    return new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(data.latitude, data.longitude),
      icon: `/images/${data.type}.svg`,
      iconSize: new window.Tmapv2.Size(30, 30),
      title: data.name,
      map: CURRENT_MAP,
      id: data.type,
      animation: window.Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
      animationLength: 500
    });
  });

  return markers;
};

const getMarkerTooltipList = (markers: any[], CURRENT_MAP: any) => {
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

    return new window.Tmapv2.InfoWindow({
      position: new window.Tmapv2.LatLng(lat, lng), // Popup 이 표출될 맵 좌표
      align: 18,
      content: content, // Popup 표시될 text
      type: 2,
      map: CURRENT_MAP,
      border: 0,
      visible: false
    });
  });

  return markerTooltipList;
};

const getEventMarkers = (markers: any[], CURRENT_MAP: any, markerTooltipList: any[]) => {
  return markers.map((marker, idx) => {
    marker.addListener('touchend', () => {
      const lat = marker._marker_data.options.position._lat;
      const lng = marker._marker_data.options.position._lng;
      CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

      if (marker._status.mouse.isMouseDown) marker.setVisible(false);
      markerTooltipList[idx].setVisible(true);
    }),
      marker.addListener('click', () => {
        const lat = marker._marker_data.options.position._lat;
        const lng = marker._marker_data.options.position._lng;
        CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

        if (marker._status.mouse.mouseClickFlag) marker.setVisible(false);
        markerTooltipList[idx].setVisible(true);
      });
    return marker;
  });
};
