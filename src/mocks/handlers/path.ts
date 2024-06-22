import { rest } from 'msw';

import { PATH } from '../data/path';

import { PathDto } from '@apis/type';

export const pathHandler = [
  rest.get('path/:search/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<PathDto>(PATH));
  })
];
