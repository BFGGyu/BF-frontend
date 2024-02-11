import { render, screen } from '@testing-library/react';

import PlaceInfoSection from '@detail/PlaceInfoSection';
import { IFacilityMarker } from 'types/map';

const initialSelectedPlace: IFacilityMarker = {
  address: '서울 종로구 효자로12',
  closing_time: '18:00',
  contact: '00-0000-0000',
  id: 1,
  imageSrc: 'https://wheelpass.s3.ap-northeast-2.amazonaws.com/gomuseum.jpg',
  latitude: '37.5765513',
  longitude: '126.9756893',
  name: '국립고궁박물관',
  opening_time: '10:00',
  type: 'museum'
};

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { result: '국립고궁박물관' },
    asPath: '/navigation?result=국립고궁박물관'
  })
}));

jest.mock('@apis/map', () => ({
  // api mock 함수 및 Promise 반환 설정
  getDetailFacility: jest.fn(() => Promise.resolve(initialSelectedPlace))
}));

describe('PlaceInfoSection 컴포넌트 테스트', () => {
  it('PlaceInfoSection test', () => {
    render(
      <PlaceInfoSection selectedPlace={initialSelectedPlace} setSelectedPlace={() => jest.fn()} />
    );

    const name = screen.getByText('국립고궁박물관');
    const address = screen.getByText('서울 종로구 효자로12');

    expect(require('@apis/map').getDetailFacility).toHaveBeenCalledWith('국립고궁박물관');
    expect(name).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });
});
