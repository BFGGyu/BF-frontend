import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const Index: NextPage = () => {
  return <TestStyle>Index</TestStyle>;
};

const TestStyle = styled.div`
  color: red;
`;

export default Index;
