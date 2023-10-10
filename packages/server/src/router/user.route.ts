import Router from 'koa-router';
import {
  userValidator,
  verifyLogin,
  verifyUser,
} from '../validator/user.validator';
import { login, register } from '../controller/user.controller';
import { crpyPassword } from '../middleware/user.middleware';

const userRouter = new Router({ prefix: '/user' });

// 注册接口
userRouter.post('/register', userValidator, verifyUser, crpyPassword, register);
// 登录接口
userRouter.post('/login', userValidator, verifyLogin, login);
export default userRouter;
