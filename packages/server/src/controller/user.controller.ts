import type { Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import { createUser, getUserInfo } from '../service/user.service';
import { userLoginError, userRegisterError } from '../constants/err.type';
import { JWT_SECRET } from '../config';

// 注册操作
export const register: Middleware = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const res = await createUser(username, password);
    // 返回结果
    ctx.body = {
      code: 200,
      message: '用户注册成功',
      result: {
        id: res.id,
        username: res.username,
      },
    };
  } catch (error) {
    console.error(error);
    ctx.app.emit('error', userRegisterError, ctx);
  }
};
// 登录操作（签发token）
export const login: Middleware = async (ctx) => {
  const { username } = ctx.request.body;
  try {
    const { password, ...res } = await getUserInfo(username);
    ctx.body = {
      code: 200,
      message: '用户登录成功',
      result: {
        token: jwt.sign(res, JWT_SECRET, { expiresIn: '30d' }),
      },
    };
  } catch (error) {
    console.error('用户登录失败', error);
    ctx.app.emit('error', userLoginError, ctx);
  }
};
