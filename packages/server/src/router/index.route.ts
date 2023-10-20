import Router from 'koa-router';
import userRouter from './user.route';
import siteRouter from './site.route';
import trackerRouter from './tracker.route';
const router = new Router();

router
  .use(userRouter.routes())
  .use(siteRouter.routes())
  .use(trackerRouter.routes());

export default router;
