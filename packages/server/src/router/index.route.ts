import Router from 'koa-router';
import userRouter from './user.route';
import siteRouter from './site.route';

const router = new Router();

router.use(userRouter.routes()).use(siteRouter.routes());

export default router;
