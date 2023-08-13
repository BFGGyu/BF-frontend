import { IMarker } from '@@types/map';
import COLOR from '@constants/colors';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

export const initTmap = async (markerData: IMarker[], centerLat: any, centerLng: any) => {
  console.log('initTmap markerData:', markerData);
  let markers: any[] = [];

  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(centerLat, centerLng), // 지도 초기 좌표
    width: '390px',
    height: '588px',
    zoom: 12,
    pinchZoom: true,
    scrollwheel: false
  });

  markerData.map((data) => {
    const newMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(data.latitude, data.longitude),
      icon: `${process.env.NEXT_PUBLIC_AWS_S3}/${data.type}.svg`,
      iconSize: new window.Tmapv2.Size(40, 40),
      title: data.name,
      map: CURRENT_MAP,
      id: data.type
    });
    markers.push(newMarker);
  });

  const infoWindowArray: any[] = [];

  markers.map((currentMarker) => {
    const lat = currentMarker._marker_data.options.position._lat;
    const lng = currentMarker._marker_data.options.position._lng;
    console.log('lat lng:', lat, lng);

    const name = currentMarker._marker_data.options.title;
    const content = `
    <div style='display: flex; align-items: center; padding: 0px 5px; background-color: ${COLOR.WHITE}; outline-offset: 0.1rem; outline: 1rem solid white;
    width: 220px; border-radius: 100px;'>
      <div style='font-size: 16px; font-weight: 500; width: 150px;'>${name}</div>
      <div style='background-color: ${COLOR.BLUE1}; color: ${COLOR.WHITE}; width: 100px; height: 40px;
      border-radius: 100px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700'>
          <a href='/map?result=${name}'>길찾기</a>
        </div>
      </div>`;

    infoWindowArray.push(
      new window.Tmapv2.InfoWindow({
        position: new window.Tmapv2.LatLng(lat + 0.031, lng - 0.03), //Popup 이 표출될 맵 좌표
        content: content, //Popup 표시될 text
        type: 2,
        map: CURRENT_MAP,
        border: 0,
        visible: false
      })
    );
  });

  markers.map((marker, idx) => {
    marker.addListener('touchend', () => {
      const lat = marker._marker_data.options.position._lat;
      const lng = marker._marker_data.options.position._lng;
      CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

      infoWindowArray[idx].setVisible(true);
    }),
      marker.addListener('click', () => {
        const lat = marker._marker_data.options.position._lat;
        const lng = marker._marker_data.options.position._lng;
        CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

        infoWindowArray[idx].setVisible(true);
      });
  });

  CURRENT_MAP.addListener('touchend', () => {
    infoWindowArray.map((info) => info.setVisible(false));
  });

  CURRENT_MAP.addListener('click', () => {
    infoWindowArray.map((info) => info.setVisible(false));
  });

  return markers;
};
