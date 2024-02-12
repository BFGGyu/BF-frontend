import { ITag } from 'types/map';

export const TAG_INITIAL_VALUE: ITag[] = [
  {
    id: 0,
    type: 'museum',
    name: '박물관',
    clicked: false
  },
  {
    id: 1,
    type: 'artGallery',
    name: '미술관',
    clicked: false
  },
  {
    id: 2,
    type: 'exhibition',
    name: '전시회',
    clicked: false
  }
];

export const PLACE_DIC = {
  museum: '박물관',
  artGallery: '미술관',
  exhibition: '전시회'
};
