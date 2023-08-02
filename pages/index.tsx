import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Index: NextPage = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flexBasis: '30%', border: '3px solid black' }}>header</div>
        <div style={{ flexBasis: '70%', border: '3px solid black' }}>body</div>
      </div>
    </>
  );
};

export default Index;
