import React from 'react';
import { styled } from 'styled-components';

import COLOR from '@constants/colors';
import FONT from '@constants/fonts';
import { ITotalRouteResult } from 'types/map';

const RouteResultSection = ({ routeResult }: { routeResult: ITotalRouteResult }) => {
  return (
    <RouteResultWrapper>
      <DistanceWrapper>
        <ArriveText style={FONT.BODY2}>도착예정</ArriveText>
        <DataUnitWrapper>
          <TotalDistance style={FONT.HEADLINE1}>{routeResult.distance} </TotalDistance>
          <ResultUnit style={FONT.BODY2}>m</ResultUnit>
        </DataUnitWrapper>
      </DistanceWrapper>
      <DataUnitWrapper>
        <TotalDuration style={FONT.HEADLINE1}>{routeResult.duration}</TotalDuration>
        <ResultUnit style={FONT.BODY2}>분</ResultUnit>
      </DataUnitWrapper>
    </RouteResultWrapper>
  );
};

const RouteResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  padding-bottom: 10px;
`;

const DistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ArriveText = styled.div`
  color: ${COLOR.BLUE1};
`;

const DataUnitWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TotalDistance = styled.div``;

const ResultUnit = styled.div``;

const TotalDuration = styled.div``;

export default RouteResultSection;
