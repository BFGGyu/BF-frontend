import COLOR from '@constants/colors';
import axios from 'axios';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;
const CENTER = { LAT: '37.53084364186228', LNG: '127.081908811749' };
const START = { LAT: '37.519892712436906', LNG: '127.02810900563199' };
const END = { LAT: '37.53288934463672', LNG: '127.11971717230388' };
const PATH_MARKER_1 = { LAT: '37.5591696189164', LNG: '127.07389565460413' };
const PATH_MARKER_2 = { LAT: '37.52127761904626', LNG: '127.13346617572014' };

const CENTER1 = { LAT: '37.5770498', LNG: '126.9749061' };
const START1 = { LAT: '37.5759848', LNG: '126.9740679' };
const PATH1 = { LAT: '37.5760863', LNG: '126.9741329' };
const PATH2 = { LAT: '37.5771287', LNG: '126.9740089' };
const PATH3 = { LAT: '37.5771646', LNG: '126.9742312' };
const PATH4 = { LAT: '37.5770251', LNG: '126.9743039' };
const PATH5 = { LAT: '37.5770498', LNG: '126.9757761' };
const PATH6 = { LAT: '37.5765595', LNG: '126.9757996' };
const END1 = { LAT: '37.5765513', LNG: '126.9756893' };

const pathList = [PATH1, PATH2, PATH3, PATH4, PATH5]; // 최대 5개
const markerList = [PATH1, PATH2, PATH3, PATH4, PATH5, PATH6];

// 교통정보에 따라 달라지는 색깔
const trafficColors = {
  extractStyles: true,
  /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
  trafficDefaultColor: COLOR.BLUE1, //Default
  trafficType1Color: COLOR.GREEN, //원할
  trafficType2Color: COLOR.ORANGE, //지체
  trafficType3Color: COLOR.RED //정체
};

// 선 스타일
const styleRed = {
  fillColor: '#FF0000',
  fillOpacity: 0.2,
  strokeColor: '#FF0000',
  strokeWidth: 3,
  strokeDashstyle: 'solid',
  pointRadius: 2,
  title: 'this is a red line'
};

interface IMarkerData {
  id: number;
  lat: string;
  lng: string;
  name: string;
  type: string;
}

export const initTmap = (markerData: IMarkerData[]) => {
  let markers: any[] = [];

  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(CENTER.LAT, CENTER.LNG), // 지도 초기 좌표
    width: '390px',
    height: '588px',
    zoom: 12,
    pinchZoom: true,
    scrollwheel: false
  });

  markerData.map((data) => {
    const newMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(data.lat, data.lng),
      icon: `${process.env.NEXT_PUBLIC_AWS_S3}/${data.type}.svg`,
      iconSize: new window.Tmapv2.Size(40, 40),
      title: data.name,
      map: CURRENT_MAP
    });
    markers.push(newMarker);
  });

  const infoWindowArray: any[] = [];

  markers.map((currentMarker) => {
    const lat = currentMarker._marker_data.options.position._lat;
    const lng = currentMarker._marker_data.options.position._lng;

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

  markers.map((marker, idx) =>
    marker.addListener('click', () => {
      const lat = marker._marker_data.options.position._lat;
      const lng = marker._marker_data.options.position._lng;
      CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));

      infoWindowArray[idx].setVisible(true);
    })
  );

  CURRENT_MAP.addListener('click', () => {
    infoWindowArray.map((info) => info.setVisible(false));
  });
};

export const initRouteMap = async (CURRENT_MAP: any) => {
  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(CENTER1.LAT, CENTER1.LNG), // 지도 초기 좌표
    width: '390px',
    height: '570px',
    zoom: 18,
    pinchZoom: true,
    zoomControl: false
  });

  // 출발
  const startMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(START1.LAT, START1.LNG),

    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  // 도착
  const endMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(END1.LAT, END1.LNG),

    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  markerList.map(
    (marker) =>
      new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(marker.LAT, marker.LNG),
        icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
        iconSize: new window.Tmapv2.Size(24, 38),
        map: CURRENT_MAP
      })
  );

  let text: string[] = [];
  pathList.map((path) => text.push(`${path.LNG},${path.LAT}`));
  const passList = text.join('_');

  const requestData = {
    startX: START1.LNG,
    startY: START1.LAT,
    endX: END1.LNG,
    endY: END1.LAT,
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

      new window.Tmapv2.InfoWindow({
        position: new window.Tmapv2.LatLng(END.LAT, END.LNG),
        type: 2,
        content: 'BFGGyu',
        border: '3px dashed black',
        background: COLOR.BLUE3,
        zIndex: 1,
        visible: true,
        map: CURRENT_MAP
      });
    })
    .catch((e) => console.log(e));
  return CURRENT_MAP;
};

export const startNavigation = (CURRENT_MAP: any) => {
  CURRENT_MAP.panTo(new window.Tmapv2.LatLng(START.LAT, START.LNG));
  setTimeout(() => CURRENT_MAP.setZoom(17), 500);
};

export const initNavigationTmap = async () => {
  // map 생성
  // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
  const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
    center: new window.Tmapv2.LatLng(START1.LAT, START1.LNG), // 지도 초기 좌표
    width: '390px',
    height: '100%',
    zoom: 19,
    pinchZoom: true,
    scrollwheel: false,
    zoomControl: false
  });

  // 출발
  const startMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(START1.LAT, START1.LNG),

    icon: `${process.env.NEXT_PUBLIC_AWS_S3}/artGallery.svg`,

    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  // 도착
  const endMarker = new window.Tmapv2.Marker({
    position: new window.Tmapv2.LatLng(END1.LAT, END1.LNG),

    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
    iconSize: new window.Tmapv2.Size(24, 38),
    map: CURRENT_MAP
  });

  markerList.map(
    (marker) =>
      new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(marker.LAT, marker.LNG),
        icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
        iconSize: new window.Tmapv2.Size(24, 38),
        map: CURRENT_MAP
      })
  );

  let text: string[] = [];
  pathList.map((path) => text.push(`${path.LNG},${path.LAT}`));
  const passList = text.join('_');

  const requestData = {
    startX: START1.LNG,
    startY: START1.LAT,
    endX: END1.LNG,
    endY: END1.LAT,
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

      new window.Tmapv2.InfoWindow({
        position: new window.Tmapv2.LatLng(END.LAT, END.LNG),
        type: 2,
        content: 'BFGGyu',
        border: '3px dashed black',
        background: COLOR.BLUE3,
        zIndex: 1,
        visible: true,
        map: CURRENT_MAP
      });
    })
    .catch((e) => console.log(e));
  return CURRENT_MAP;
};
