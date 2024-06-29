import { NextRouter } from 'next/router';

export const changeCurrentPosition = (
  currentMap: Tmapv2.Map | null,
  startMarker: Tmapv2.Marker | null,
  lat: number,
  lng: number
) => {
  if (currentMap) currentMap.panTo(new Tmapv2.LatLng(lat, lng));
  if (startMarker) startMarker.setPosition(new Tmapv2.LatLng(lat, lng));
};

export const speakNavigationGuide = (voiceText: string) => {
  const utterance = new SpeechSynthesisUtterance(voiceText);
  speechSynthesis.speak(utterance);
};

export const getDistanceCurrentToTarget = (current: any, target: any) => {
  const currentLonLat = new Tmapv2.LatLng(current.lat, current.lng);
  const targetLonLat = new Tmapv2.LatLng(target.latitude, target.longitude);
  const distance = currentLonLat.distanceTo(targetLonLat);
  return Math.ceil(distance);
};

export const handleClickMovePage = (
  router: NextRouter,
  targetPage: string,
  searchResult: string
) => {
  router.push(targetPage, {
    pathname: targetPage,
    query: { result: searchResult }
  });
};
