const { rest } = require('msw');

const handlers = [
  rest.get('/api/product', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        center: { LAT: '37.53084364186228', LNG: '127.081908811749' }
      })
    );
  })
];

export default handlers;
