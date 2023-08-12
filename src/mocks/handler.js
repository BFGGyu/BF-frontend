const CENTER1 = { LAT: '37.5770498', LNG: '126.9749061' };

const { rest } = require('msw');

const handlers = [
  rest.get('/api/map', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        data: {
          path_id: 1,
          center: {
            latitude: '37.5770498',
            longitude: '126.9749061'
          },
          departure: {
            latitude: '37.5759848',
            longitude: '126.9740679'
          },
          arrival: {
            latitude: '37.5765513',
            longitude: '126.9756893'
          },
          markers: [
            {
              id: 1,
              latitude: '37.5760863',
              longitude: '126.9741329',
              path_id: 1
            },
            {
              id: 2,
              latitude: '37.5771287',
              longitude: '126.9740089',
              path_id: 1
            },
            {
              id: 3,
              latitude: '37.5771646',
              longitude: '126.9742312',
              path_id: 1
            },
            {
              id: 4,
              latitude: '37.5770251',
              longitude: '126.9743039',
              path_id: 1
            },
            {
              id: 5,
              latitude: '37.5770498',
              longitude: '126.9757761',
              path_id: 1
            },
            {
              id: 6,
              latitude: '37.5765595',
              longitude: '126.9757996',
              path_id: 1
            }
          ],
          routes: [
            {
              id: 1,
              latitude: '37.5760863',
              longitude: '126.9741329',
              path_id: 1
            },
            {
              id: 2,
              latitude: '37.5771287',
              longitude: '126.9740089',
              path_id: 1
            },
            {
              id: 3,
              latitude: '37.5771646',
              longitude: '126.9742312',
              path_id: 1
            },
            {
              id: 4,
              latitude: '37.5770251',
              longitude: '126.9743039',
              path_id: 1
            },
            {
              id: 5,
              latitude: '37.5770498',
              longitude: '126.9757761',
              path_id: 1
            }
          ]
        }
      })
    );
  }),

  rest.get('/api/path', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        data: {
          path_id: 1,
          departure: {
            latitude: '37.5759848',
            longitude: '126.9740679'
          },
          arrival: {
            latitude: '37.5765513',
            longitude: '126.9756893'
          },
          markers: [
            {
              id: 1,
              latitude: '37.5760863',
              longitude: '126.9741329',
              path_id: 1
            },
            {
              id: 2,
              latitude: '37.5771287',
              longitude: '126.9740089',
              path_id: 1
            },
            {
              id: 3,
              latitude: '37.5771646',
              longitude: '126.9742312',
              path_id: 1
            },
            {
              id: 4,
              latitude: '37.5770251',
              longitude: '126.9743039',
              path_id: 1
            },
            {
              id: 5,
              latitude: '37.5770498',
              longitude: '126.9757761',
              path_id: 1
            },
            {
              id: 6,
              latitude: '37.5765595',
              longitude: '126.9757996',
              path_id: 1
            }
          ],
          routes: [
            {
              id: 1,
              latitude: '37.5760863',
              longitude: '126.9741329',
              path_id: 1
            },
            {
              id: 2,
              latitude: '37.5771287',
              longitude: '126.9740089',
              path_id: 1
            },
            {
              id: 3,
              latitude: '37.5771646',
              longitude: '126.9742312',
              path_id: 1
            },
            {
              id: 4,
              latitude: '37.5770251',
              longitude: '126.9743039',
              path_id: 1
            },
            {
              id: 5,
              latitude: '37.5770498',
              longitude: '126.9757761',
              path_id: 1
            }
          ]
        }
      })
    );
  }),
  rest.get('/api/center', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        data: { lat: '37.53084364186228', lng: '127.081908811749' }
      })
    );
  }),
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
