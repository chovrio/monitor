import bcrypt from 'bcryptjs';
import { Middleware } from 'koa';

export const crpySite: Middleware = async (ctx, next) => {
  const { username, site } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(username + site, salt);
  ctx.request.body.id = hash;
  await next();
};
