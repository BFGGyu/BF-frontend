import { ICoord, IFacilityMarker, IRoute, IRouteMarker } from '@@types/map';
import COLOR from '@constants/colors';
import axios from 'axios';

const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;

export const initRouteMap = async (
  center: ICoord,
  departure: ICoord,
  arrival: ICoord,
  markerList: IRouteMarker[],
  routes: IRoute[]
) => {
  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(center.latitude, center.longitude), // 지도 초기 좌표
    width: '390px',
    height: '570px',
    zoom: 18,
    pinchZoom: true,
    zoomControl: false
  });

  // 출발
  const startMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(departure.latitude, departure.longitude),
    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  // 도착
  const endMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(arrival.latitude, arrival.longitude),
    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  markerList.map(
    (marker) =>
      new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(marker.latitude, marker.longitude),
        icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
        iconSize: new window.Tmapv2.Size(24, 38),
        map: CURRENT_MAP
      })
  );

  let text: string[] = [];
  routes.map((path) => text.push(`${path.longitude},${path.latitude}`));
  const passList = text.join('_');

  const requestData = {
    startX: departure.longitude,
    startY: departure.latitude,
    endX: arrival.longitude,
    endY: arrival.latitude,
    passList: passList,
    reqCoordType: 'WGS84GEO',
    resCoordType: 'EPSG3857',
    startName: '출발지',
    endName: '도착지'
  };

  const headers = {
    appKey: APP_KEY
  };

  await axios
    .post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
      requestData,
      { headers: headers }
    )
    .then((response) => {
      const resultData = response.data.features;
      const tDistance =
        '총 거리 : ' + (resultData[0].properties.totalDistance / 1000).toFixed(1) + 'km,';
      const tTime = ' 총 시간 : ' + (resultData[0].properties.totalTime / 60).toFixed(0) + '분';
      const resultText = tDistance + tTime;
      console.log(resultData);

      const drawInfoArr = [];

      // for문 시작
      for (let i in resultData) {
        const geometry = resultData[i].geometry;
        const properties = resultData[i].properties;

        // geometry.type == 'LineString' | 'Point'
        if (geometry.type == 'LineString') {
          for (let j in geometry.coordinates) {
            // 경로들의 결과값(구간)들을 포인트 객체로 변환
            const latlng = new window.Tmapv2.Point(
              geometry.coordinates[j][0],
              geometry.coordinates[j][1]
            );
            // 포인트 객체를 받아 좌표값으로 변환
            const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
            // 포인트객체의 정보로 좌표값 변환 객체로 저장
            const convertChange = new window.Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
            // 배열에 담기
            drawInfoArr.push(convertChange);
          }
        } else {
          let markerImg = '';
          let pType = '';
          let size;

          if (properties.pointType == 'S') {
            //출발지 마커
            markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
            pType = 'S';
            size = new window.Tmapv2.Size(24, 38);
          } else if (properties.pointType == 'E') {
            //도착지 마커
            markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
            pType = 'E';
            size = new window.Tmapv2.Size(24, 38);
          } else {
            //각 포인트 마커
            markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
            pType = 'P';
            size = new window.Tmapv2.Size(8, 8);
          }

          // 경로들의 결과값들을 포인트 객체로 변환
          const latlon = new window.Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]); // 포인트 객체를 받아 좌표값으로 다시 변환
          const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

          const routeInfoObj = {
            markerImage: markerImg,
            lng: convertPoint._lng,
            lat: convertPoint._lat,
            pointType: pType
          };

          // Marker 추가 (흰색 동그라미 마커)
          const marker_p = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
            icon: routeInfoObj.markerImage,
            iconSize: size,
            map: CURRENT_MAP
          });
        }
      }

      //for문 종료
      drawLine(drawInfoArr);

      function drawLine(arrPoint: any[]) {
        new window.Tmapv2.Polyline({
          path: arrPoint,
          strokeColor: COLOR.BLUE1,
          strokeWeight: 6,
          map: CURRENT_MAP
        });
      }
    })
    .catch((e: any) => console.log(e));
  return CURRENT_MAP;
};
