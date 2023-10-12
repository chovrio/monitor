import Router from 'koa-router';
import {
  userValidator,
  verifyLogin,
  verifyUser,
} from '../validator/user.validator';
import { login, register } from '../controller/user.controller';
import { crpyPassword } from '../middleware/user.middleware';
import { auth } from '../middleware/auth.middleware';
import { findSite } from '../controller/site.contrller';

const userRouter = new Router({ prefix: '/user' });

// 注册接口
userRouter.post('/register', userValidator, verifyUser, crpyPassword, register);

// 登录接口
userRouter.post('/login', userValidator, verifyLogin, login);

// 查看用户有的站点
userRouter.get('/sites', auth, findSite);

export default userRouter;
