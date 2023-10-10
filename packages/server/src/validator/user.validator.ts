import type { Middleware } from 'koa';
import bcrypt from 'bcryptjs';
import {
  findUserError,
  userAlreadyExited,
  userDoesNotExist,
  userFormateError,
  userLoginError,
} from '../constants/err.type';
import { getUserInfo } from '../service/user.service';
export const userValidator: Middleware = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    return ctx.app.emit('error', userFormateError, ctx);
  }
  await next();
};

export const verifyUser: Middleware = async (ctx, next) => {
  const { username } = ctx.request.body;
  try {
    const res = await getUserInfo(username);
    if (res) {
      console.error('用户名已经存在', { username });
      ctx.app.emit('error', userAlreadyExited, ctx);
    }
  } catch (error) {
    console.error('获取用户信息错误', error);
    ctx.app.emit('error', findUserError, ctx);
  }
  await next();
};

export const verifyLogin: Middleware = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    const res = await getUserInfo(username);
    if (!res) {
      console.error('用户名不存在', { username });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', userLoginError, ctx);
    }
  } catch (error) {
    console.error(error);
    return ctx.app.emit('error', userLoginError, ctx);
  }
  await next();
};
