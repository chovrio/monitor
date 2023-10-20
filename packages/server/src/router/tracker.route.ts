import Router from 'koa-router';

const trackerRouter = new Router({ prefix: '/tracker' });

trackerRouter.post('/', (ctx) => {
  console.log(JSON.parse(ctx.request.body));
  const body = ctx.request.body;
  ctx.body = 'ok';
});

export default trackerRouter;
