import bcrypt from 'bcryptjs';
import type { Middleware } from 'koa';

export const crpyPassword: Middleware = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};
