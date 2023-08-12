import FooterSection from '@main/FooterSection';
import HeaderSection from '@main/HeaderSection';
import MapSection from '@main/MapSection';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Splash from './Splash';

const Index: NextPage = () => {
  return (
    <Splash />
    // <SectionWrapper>
    //   <HeaderSection />
    //   <MapSection />
    //   <FooterSection />
    // </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Index;
