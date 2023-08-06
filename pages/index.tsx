import FooterSection from '@/components/main/FooterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MapSection from '@/components/main/MapSection';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
