import { rest } from 'msw';

import { FACILITIES } from '../data/facility';

import { FacilityDto } from '@apis/type';

export const facilityHandler = [
  rest.get('place/facility/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<FacilityDto[]>(FACILITIES));
  }),
  rest.get('place/facility/:search/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<FacilityDto>(FACILITIES[0]));
  })
];
