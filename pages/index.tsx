import FooterSection from '@/components/main/FooterSection';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderSection from '../src/components/main/HeaderSection';
import MapSection from '../src/components/main/MapSection';

const Index: NextPage = () => {
  return (
    <SectionWrapper>
      <HeaderSection />
      <MapSection />
      <FooterSection />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Index;
