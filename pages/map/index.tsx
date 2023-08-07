import { initRouteMap } from '@utils/maps';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';

let CURRENT_MAP: any;
const MapPage: NextPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initRouteMap(CURRENT_MAP);
  }, []);

  return (
    <>
      <div ref={mapRef} id='map_div'></div>
    </>
  );
};

export default MapPage;
