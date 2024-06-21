import { FacilityDto } from '@apis/type';

export const facilities: FacilityDto[] = [
  {
    id: 1,
    name: '국립고궁박물관',
    type: 'museum',
    contact: '02-3701-7500',
    address: '서울 종로구 효자로12',
    opening_time: '10:00',
    closing_time: '18:00',
    latitude: '37.5765595',
    longitude: '126.9757996',
    imageSrc: '이미지 경로'
  },
  {
    id: 2,
    name: '국립중앙박물관',
    type: 'artGallery',
    contact: '02-3701-7557',
    address: '서울 종로구 효자로1223123',
    opening_time: '09:00',
    closing_time: '18:00',
    latitude: '37.5759848',
    longitude: '126.9740679',
    imageSrc: '이미지 경로'
  },
  {
    id: 3,
    name: '헬로우박물관',
    type: 'exhibition',
    contact: '02-3701-7557',
    address: '서울 종로구 효자로1223123',
    opening_time: '09:00',
    closing_time: '18:00',
    latitude: '37.5759730',
    longitude: '126.9734500',
    imageSrc: '이미지 경로'
  },
  {
    id: 4,
    name: '테스트전시회',
    type: 'exhibition',
    contact: '02-3701-7557',
    address: '서울 종로구 효자로1223123',
    opening_time: '09:00',
    closing_time: '18:00',
    latitude: '37.5757730',
    longitude: '126.9732500',
    imageSrc: '이미지 경로'
  },
  {
    id: 5,
    name: '테스트미술관',
    type: 'artGallery',
    contact: '02-3701-7557',
    address: '서울 종로구 효자로1223123',
    opening_time: '09:00',
    closing_time: '18:00',
    latitude: '37.5756730',
    longitude: '126.9739500',
    imageSrc: '이미지 경로'
  }
];
