import axios from 'axios';
import toast from 'react-hot-toast';

import COLOR from '@constants/colors';
import { RouteMapDto } from 'types/map';

const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;
const TMAP_API_URL =
  'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result';

interface NavigationMapParams {
  navigationCoords: RouteMapDto;
  currentMap: Tmapv2.Map;
}

export const initNavigationMap = async ({ navigationCoords, currentMap }: NavigationMapParams) => {
  const { departure, arrival, routes } = navigationCoords;

  // 출발
  const startMarker = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(departure.latitude, departure.longitude),
    icon: `/images/departure.svg`,
    iconSize: new Tmapv2.Size(24, 38),
    map: currentMap
  });

  // 도착
  const endMarker = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(arrival.latitude, arrival.longitude),
    icon: '/images/arrival.svg',
    iconSize: new Tmapv2.Size(24, 38),
    map: currentMap
  });

  const currentPositionMarker = new Tmapv2.Marker({
    position: new Tmapv2.LatLng(departure.latitude, departure.longitude),
    icon: '/images/currentPosition.svg',
    iconSize: new Tmapv2.Size(30, 45),
    map: currentMap
  });

  const drawInfoArray: any[] = [];
  const pointArray: any[] = [];
  let turnPointMarkerList: any[] = [];

  // 경유지(passList) 설정(최대 5곳). 단, 경로가 너무 벗어날 경우와 5곳 이상일 경우 error 발생
  const passList = routes.map((coord) => `${coord.longitude},${coord.latitude}`).join('_');

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
    .post(TMAP_API_URL, requestData, { headers: headers })
    .then((response) => {
      const resultData = response.data.features;
      const tDistance =
        '총 거리 : ' + (resultData[0].properties.totalDistance / 1000).toFixed(1) + 'km,';
      const tTime = ' 총 시간 : ' + (resultData[0].properties.totalTime / 60).toFixed(0) + '분';
      const resultText = tDistance + tTime;

      // for문 시작
      for (let i in resultData) {
        const geometry = resultData[i].geometry;
        const properties = resultData[i].properties;

        // geometry.type == 'LineString' | 'Point'
        if (geometry.type == 'LineString') {
          for (let j in geometry.coordinates) {
            // 경로들의 결과값(구간)들을 포인트 객체로 변환
            const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);

            // 포인트 객체를 받아 좌표값으로 변환
            const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

            // 포인트객체의 정보로 좌표값 변환 객체로 저장
            const convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);

            // 배열에 담기
            drawInfoArray.push(convertChange);
          }
        } else {
          // 경로들의 결과값들을 포인트 객체로 변환
          const latlng = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);

          // 포인트 객체를 받아 좌표값으로 다시 변환
          const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

          pointArray.push({
            latitude: convertPoint._lat,
            longitude: convertPoint._lng,
            description: properties.description
          });
        }
      }

      //for문 종료
      drawLine(drawInfoArray);

      const regex = /[^0-9]/g;
      turnPointMarkerList = pointArray.map((point) => ({
        ...point,
        distance: point.description.replace(regex, '')
      }));

      function drawLine(arrPoint: Tmapv2.LatLng[]) {
        new Tmapv2.Polyline({
          path: arrPoint,
          strokeColor: COLOR.BLUE1,
          strokeWeight: 6,
          map: currentMap
        });
      }
    })
    .catch((err: unknown) => {
      const error = err as Error;
      toast.error(error.message);
    });

  return { currentMap, currentPositionMarker, turnPointMarkerList };
};
