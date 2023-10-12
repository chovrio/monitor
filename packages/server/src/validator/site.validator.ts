import { type Middleware } from 'koa';
import {
  findUserError,
  siteExistError,
  siteInfoError,
  userDoesNotExist,
} from '../constants/err.type';
import { getUserInfo } from '../service/user.service';
import { findSiteByInfo } from '../service/site.service';

export const verifySite: Middleware = async (ctx, next) => {
  const { site, name, username } = ctx.request.body;
  if (!site || !name || !username) {
    console.error('站点信息不完整', ctx.request.body);
    return ctx.app.emit('error', siteInfoError, ctx);
  }
  try {
    const name = await getUserInfo(username);
    if (!name) {
      console.error('用户名不存在', { username });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    const siteInfo = await findSiteByInfo({ username, site });
    if (siteInfo.length) {
      console.error('站点已存在', { username, site });
      ctx.app.emit('error', siteExistError, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error('查询用户出错', error);
    return ctx.app.emit('error', findUserError, ctx);
  }
};
