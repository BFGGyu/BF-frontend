import axios from 'axios';

import COLOR from '@constants/colors';
import SCREEN_SIZE from '@constants/sizes';
import { ITotalRouteResult, RouteMapDto } from 'types/map';

const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;

export const initRouteMap = async ({
  departure,
  arrival,
  routes
}: RouteMapDto): Promise<ITotalRouteResult> => {
  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(37.5, 126.9),
    width: SCREEN_SIZE.WIDTH,
    height: '606px',
    zoom: 15,
    pinchZoom: true,
    zoomControl: false,
    scrollwheel: false
  });

  // markerList 에 맞게 zoom level 설정
  const latlngBounds = new window.Tmapv2.LatLngBounds(
    new window.Tmapv2.LatLng(routes[0].latitude, routes[0].longitude)
  );
  latlngBounds.extend(new window.Tmapv2.LatLng(departure.latitude, departure.longitude));
  latlngBounds.extend(new window.Tmapv2.LatLng(arrival.latitude, arrival.longitude));
  routes.map((marker) =>
    latlngBounds.extend(new window.Tmapv2.LatLng(marker.latitude, marker.longitude))
  );

  const margin = {
    left: 100,
    top: 100,
    right: 100,
    bottom: 100
  };
  CURRENT_MAP.fitBounds(latlngBounds, margin);

  // 출발
  const startMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(departure.latitude, departure.longitude),
    icon: `/images/departure.svg`,
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  // 도착
  const endMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(arrival.latitude, arrival.longitude),
    icon: `/images/arrival.svg`,
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  // 도착 장소까지의 거리와 소요시간 담을 객체
  let totalData: ITotalRouteResult = { distance: '', duration: 0 };

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
      totalData = {
        distance: resultData[0].properties.totalDistance,
        duration: Math.ceil((resultData[0].properties.totalTime * 3.3) / 60)
      };

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
    .catch((error: any) => console.error(error));
  return totalData;
};
