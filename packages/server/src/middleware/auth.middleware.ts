import { type Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { jsonWebTokenError, tokenExpiredError } from '../constants/err.type';

export const auth: Middleware = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
    await next();
  } catch (error: any) {
    switch (error?.name) {
      case 'TokenExpiredError':
        console.error('token过期', error);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('无效的token', error);
        return ctx.app.emit('error', jsonWebTokenError, ctx);
      default:
        console.error('异常错误');
        break;
    }
  }
};
