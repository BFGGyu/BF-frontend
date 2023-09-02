import { NextRouter } from 'next/router';

export const changeCurrentPostion = (
  CURRENT_MAP: any,
  startMarker: any,
  lat: number,
  lng: number
) => {
  if (CURRENT_MAP) CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));
  if (startMarker) startMarker.setPosition(new window.Tmapv2.LatLng(lat, lng));
  console.log('changeCurrentPosition: ', CURRENT_MAP, startMarker);
};

export const changeMarker = (markerType: string, markers: any) => {
  markers.forEach((marker: any) => {
    if (marker._marker_data.id === markerType) {
      marker.setVisible(true);
    } else marker.setVisible(false);
  });
};

export const speakNavigationGuide = (voiceText: string) => {
  const utterance = new SpeechSynthesisUtterance(voiceText);
  speechSynthesis.speak(utterance);
};

export const getDistanceCurrentToTarget = (current: any, target: any) => {
  const currentLonLat = new window.Tmapv2.LatLng(current.lat, current.lng);
  const targetLonLat = new window.Tmapv2.LatLng(target.latitude, target.longitude);
  const distance = currentLonLat.distanceTo(targetLonLat);
  console.log('distance: ', Math.ceil(distance));
  return Math.ceil(distance);
};

export const handleClickMovePage = (
  router: NextRouter,
  targetPage: string,
  searchResult: string
) => {
  router.push(targetPage, {
    query: { result: searchResult }
  });
};
