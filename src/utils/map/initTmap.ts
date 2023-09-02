import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import { IFacilityMarker, ITag } from 'types/map';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

export const initTmap = async (
  markerData: IFacilityMarker[],
  tags: ITag[],
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>
) => {
  console.log('initTmap markerData:', markerData);
  let markers: any[] = [];

  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
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
    new window.Tmapv2.LatLng(markerData[0].latitude, markerData[0].longitude)
  );

  markerData.map((data, idx) => {
    const newMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(data.latitude, data.longitude),
      icon: `/images/${data.type}.svg`,
      iconSize: new window.Tmapv2.Size(30, 30),
      title: data.name,
      map: CURRENT_MAP,
      id: data.type,
      animation: window.Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
      animationLength: 500
    });
    latlngBounds.extend(new window.Tmapv2.LatLng(data.latitude, data.longitude));
    markers.push(newMarker);
  });

  const margin = {
    left: 150,
    top: 150,
    right: 150,
    bottom: 300
  };
  CURRENT_MAP.fitBounds(latlngBounds, margin);

  const infoWindowArray: any[] = [];

  markers.map((currentMarker, idx) => {
    const lat = currentMarker._marker_data.options.position._lat;
    const lng = currentMarker._marker_data.options.position._lng;
    console.log('lat lng:', lat, lng);

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

    infoWindowArray.push(
      new window.Tmapv2.InfoWindow({
        position: new window.Tmapv2.LatLng(lat, lng), //Popup 이 표출될 맵 좌표
        align: 18,
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

      console.log('marker touch:', markers);

      if (marker._status.mouse.isMouseDown) marker.setVisible(false);
      infoWindowArray[idx].setVisible(true);
    }),
      marker.addListener('click', () => {
        console.log('marker click:', marker);

        const lat = marker._marker_data.options.position._lat;
        const lng = marker._marker_data.options.position._lng;
        CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

        if (marker._status.mouse.mouseClickFlag) marker.setVisible(false);
        infoWindowArray[idx].setVisible(true);
      });
  });

  CURRENT_MAP.addListener('click', () => {
    markers.map((marker) => marker.setVisible(true));
    setTags(tags.map((tag) => ({ ...tag, clicked: false })));
    infoWindowArray.map((info) => info.setVisible(false));
  });

  CURRENT_MAP.addListener('touchend', () => {
    markers.map((marker) => marker.setVisible(true));
    setTags(tags.map((tag) => ({ ...tag, clicked: false })));
    infoWindowArray.map((info) => info.setVisible(false));
  });

  return markers;
};
