import axios from 'axios';
import toast from 'react-hot-toast';

import COLOR from '@constants/colors';
import { ITotalRouteResult, RouteMapDto } from 'types/map';

const WHEELCHAIR_TIME_ADJUSTMENT = 3.3;
const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;
const TMAP_API_URL =
  'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result';

interface RouteMapParams {
  routingCoords: RouteMapDto;
  currentMap: Tmapv2.Map;
}

export const initRouteMap = async ({
  routingCoords,
  currentMap
}: RouteMapParams): Promise<ITotalRouteResult> => {
  const { departure, arrival, routes } = routingCoords;

  // markerList 에 맞게 zoom level 설정
  const latlngBounds = new Tmapv2.LatLngBounds(
    new Tmapv2.LatLng(routes[0].latitude, routes[0].longitude)
  );
  latlngBounds.extend(new Tmapv2.LatLng(departure.latitude, departure.longitude));
  latlngBounds.extend(new Tmapv2.LatLng(arrival.latitude, arrival.longitude));
  routes.forEach((marker) =>
    latlngBounds.extend(new Tmapv2.LatLng(marker.latitude, marker.longitude))
  );

  const margin = {
    left: 100,
    top: 100,
    right: 100,
    bottom: 100
  };
  currentMap.fitBounds(latlngBounds, margin);

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
    icon: `/images/arrival.svg`,
    iconSize: new Tmapv2.Size(24, 38),
    map: currentMap
  });

  // 도착 장소까지의 거리와 소요시간 담을 객체
  const routeResult: ITotalRouteResult = { distance: 0, duration: 0 };

  const headers = {
    appKey: APP_KEY
  };

  // 경유지(passList) 설정(최대 5곳). 단, 경로가 너무 벗어날 경우와 5곳 이상일 경우 error 발생
  const passList = routes.map((coord) => `${coord.longitude},${coord.latitude}`).join('_');

  const requestBody = {
    startX: departure.longitude,
    startY: departure.latitude,
    endX: arrival.longitude,
    endY: arrival.latitude,
    passList,
    reqCoordType: 'WGS84GEO',
    resCoordType: 'EPSG3857',
    startName: '출발지',
    endName: '도착지'
  };

  try {
    const response = await axios.post(TMAP_API_URL, requestBody, { headers });

    const distanceData: Tmapv2.PolylineResponse[] = response.data.features;
    const totalDistance = distanceData[0].properties.totalDistance;
    const totalTime = distanceData[0].properties.totalTime;

    routeResult.distance = totalDistance;
    routeResult.duration = Math.ceil((totalTime * WHEELCHAIR_TIME_ADJUSTMENT) / 60);

    const polylinePointList = distanceData
      .filter((item) => item.geometry.type === 'LineString')
      .flatMap((item) =>
        item.geometry.coordinates.map((coord) => {
          const [lat, lng] = coord;
          // 경로들의 결과값(구간)들을 포인트 객체로 변환
          const latlng = new Tmapv2.Point(lat, lng);

          // 포인트 객체를 받아 좌표값으로 변환
          const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

          // 포인트객체의 정보로 좌표값 변환 객체로 저장
          return new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
        })
      );

    drawLine(currentMap, polylinePointList);
  } catch (err: unknown) {
    const error = err as Error;
    toast.error(error.message);
  }

  return routeResult;
};

const drawLine = (currentMap: Tmapv2.Map, polylinePointList: Tmapv2.LatLng[]) => {
  new Tmapv2.Polyline({
    path: polylinePointList,
    strokeColor: COLOR.BLUE1,
    strokeWeight: 6,
    map: currentMap
  });
};
