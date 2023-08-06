import COLOR from '@constants/colors';
import axios from 'axios';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

// 5. 경로탐색 결과 Line 그리기
// 교통정보에 따라 달라지는 색깔
const trafficColors = {
  extractStyles: true,
  /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
  trafficDefaultColor: COLOR.BLUE1, //Default
  trafficType1Color: COLOR.GREEN, //원할
  trafficType2Color: COLOR.ORANGE, //지체
  trafficType3Color: COLOR.RED //정체
};

// // 선 스타일
// const styleRed = {
//   fillColor: '#FF0000',
//   fillOpacity: 0.2,
//   strokeColor: '#FF0000',
//   strokeWidth: 3,
//   strokeDashstyle: 'solid',
//   pointRadius: 2,
//   title: 'this is a red line'
// };

const APP_KEY = process.env.NEXT_PUBLIC_TMAP_KEY;
const CENTER = { LAT: '37.53084364186228', LNG: '127.081908811749' };
const START = { LAT: '37.519892712436906', LNG: '127.02810900563199' };
const END = { LAT: '37.49288934463672', LNG: '127.11971717230388' };
const PATH_MARKER_1 = { LAT: '37.5591696189164', LNG: '127.07389565460413' };
const PATH_MARKER_2 = { LAT: '37.52127761904626', LNG: '127.13346617572014' };

let CURRENT_MAP: any;
const Index: NextPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initTmap = async () => {
    // map 생성
    // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    CURRENT_MAP = new window.Tmapv2.Map('map_div', {
      center: new window.Tmapv2.LatLng(CENTER.LAT, CENTER.LNG), // 지도 초기 좌표
      width: '100%',
      height: '400px',
      zoom: 12
    });

    // 출발
    const startMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(START.LAT, START.LNG),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: CURRENT_MAP
    });

    // 도착
    const endMarker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(END.LAT, END.LNG),

      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: CURRENT_MAP
    });

    // 경로1
    const pathMarker1 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(PATH_MARKER_1.LAT, PATH_MARKER_1.LNG),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: CURRENT_MAP
    });

    // 경로2
    const pathMarker2 = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(PATH_MARKER_2.LAT, PATH_MARKER_2.LNG),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: CURRENT_MAP
    });

    const passList = `${PATH_MARKER_1.LNG},${PATH_MARKER_1.LAT}_${PATH_MARKER_2.LNG},${PATH_MARKER_2.LAT}`;

    const requestData = {
      startX: START.LNG,
      startY: START.LAT,
      endX: END.LNG,
      endY: END.LAT,
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
            const latlon = new window.Tmapv2.Point(
              geometry.coordinates[0],
              geometry.coordinates[1]
            ); // 포인트 객체를 받아 좌표값으로 다시 변환
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
  };

  useEffect(() => {
    initTmap();
  }, []);

  return (
    <>
      <div ref={mapRef} id='map_div'></div>
    </>
  );
};

export default Index;
