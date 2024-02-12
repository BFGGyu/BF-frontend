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

// jest.mock('next/router', () => ({
//   useRouter: () => ({
//     query: { result: '국립고궁박물관' },
//     asPath: '/navigation?result=국립고궁박물관'
//   })
// }));

jest.mock('@apis/map', () => ({
  // api mock 함수 및 Promise 반환 설정
  getSearchResult: jest.fn((keyword) => Promise.resolve(initialSelectedPlace)),
  getRecommendPlace: jest.fn(() => Promise.resolve())
}));

describe('PlaceInfoSection 에 장소 정보를 불러온다.', () => {
  it('PlaceInfoSection test', () => {
    render(<PlaceInfoSection selectedPlace={initialSelectedPlace} result={'국립고궁박물관'} />);

    const name = screen.getByText('국립고궁박물관');
    const address = screen.getByText('서울 종로구 효자로12');

    expect(name).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });
});
