export const changeCurrentPostion = (
  CURRENT_MAP: any,
  startMarker: any,
  lat: number,
  lng: number
) => {
  if (CURRENT_MAP) CURRENT_MAP.panTo(new window.Tmapv2.LatLng(lat, lng));
  if (startMarker) startMarker.setPosition(new window.Tmapv2.LatLng(lat, lng));
  console.log('cahngeCurrentPosition: ', CURRENT_MAP, startMarker);
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
