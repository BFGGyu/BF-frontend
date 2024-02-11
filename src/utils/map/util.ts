import { NextRouter } from 'next/router';

export const changeCurrentPostion = (
  CURRENT_MAP: any,
  startMarker: any,
  lat: number,
  lng: number
) => {
  if (CURRENT_MAP) CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));
  if (startMarker) startMarker.setPosition(new window.Tmapv2.LatLng(lat, lng));
};

export const speakNavigationGuide = (voiceText: string) => {
  const utterance = new SpeechSynthesisUtterance(voiceText);
  speechSynthesis.speak(utterance);
};

export const getDistanceCurrentToTarget = (current: any, target: any) => {
  const currentLonLat = new window.Tmapv2.LatLng(current.lat, current.lng);
  const targetLonLat = new window.Tmapv2.LatLng(target.latitude, target.longitude);
  const distance = currentLonLat.distanceTo(targetLonLat);
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
