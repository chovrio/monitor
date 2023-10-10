import Router from 'koa-router';
import userRouter from './user.route';

const router = new Router();

router.use(userRouter.routes());

export default router;
