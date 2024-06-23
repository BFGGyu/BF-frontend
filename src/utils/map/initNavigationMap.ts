import axios from 'axios';

import COLOR from '@constants/colors';
import { NavigationMarker, RouteMapDto } from 'types/map';

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

  // 경유지(passList) 설정(최대 5곳). 단, 경로가 너무 벗어날 경우와 5곳 이상일 경우 error 발생
  const passList = routes.map((coord) => `${coord.longitude},${coord.latitude}`).join('_');

  const requestBody = {
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

  const response = await axios.post(TMAP_API_URL, requestBody, { headers });

  const distanceData: Tmapv2.PolylineResponse[] = response.data.features;

  const { polylinePointList, turnPointMarkerList } = distanceData.reduce(
    (acc, item) => {
      const geometry = item.geometry;
      const properties = item.properties;

      if (geometry.type === 'LineString') {
        acc.polylinePointList.push(...processLineString(geometry));
      } else {
        acc.turnPointMarkerList.push(processPoint(geometry, properties));
      }

      return acc;
    },
    { polylinePointList: [] as Tmapv2.LatLng[], turnPointMarkerList: [] as NavigationMarker[] }
  );

  drawLine(currentMap, polylinePointList);

  return { currentPositionMarker, turnPointMarkerList };
};

const drawLine = (currentMap: Tmapv2.Map, polylinePointList: Tmapv2.LatLng[]) => {
  new Tmapv2.Polyline({
    path: polylinePointList,
    strokeColor: COLOR.BLUE1,
    strokeWeight: 6,
    map: currentMap
  });
};

const processLineString = (geometry: {
  coordinates: number[][];
  type?: 'LineString' | 'Point';
}) => {
  return geometry.coordinates.map((coord: number[]) => {
    const [lat, lng] = coord;
    const latlng = new Tmapv2.Point(lat, lng);
    const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
    return new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
  });
};

const processPoint = (
  geometry: { coordinates: number[][] },
  properties: {
    description: string;
  }
): NavigationMarker => {
  const [lat, lng] = geometry.coordinates.flatMap((data) => data);
  const latlng = new Tmapv2.Point(lat, lng);
  const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
  const regex = /[^0-9]/g;

  return {
    latitude: convertPoint._lat,
    longitude: convertPoint._lng,
    description: properties.description,
    distance: properties.description.replace(regex, '')
  };
};
