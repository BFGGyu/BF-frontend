import { rest } from 'msw';

import { facilities } from '../data/facility';

import { FacilityDto } from '@apis/type';

export const facilityHandler = [
  rest.get('place/facility/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<FacilityDto[]>(facilities));
  })
];
