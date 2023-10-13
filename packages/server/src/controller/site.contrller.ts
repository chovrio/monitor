import { type Middleware } from 'koa';
import { createSite, findSiteByInfo } from '../service/site.service';
import {
  addSiteError,
  findSiteOptionError,
  siteOptionNotExist,
} from '../constants/err.type';
import { craeteOption, findSiteOption } from '../service/option.service';

// 添加站点
export const addSite: Middleware = async (ctx) => {
  const { site, name, username } = ctx.request.body;
  try {
    const resopt = await craeteOption();
    const res = await createSite(site, name, username, resopt.id);
    ctx.body = {
      code: 200,
      message: '站点添加成功',
      result: {
        id: btoa(res.id),
        site: res.site,
        name: res.name,
        username: res.username,
      },
    };
  } catch (error) {
    console.error('添加站点失败', error);
    ctx.app.emit('error', addSiteError, ctx);
  }
};

// 查询用户站点
export const findSite: Middleware = async (ctx) => {
  const { username } = ctx.state.user;
  try {
    const res = await findSiteByInfo({ username });
    res.some((site) => (site.id = btoa(site.id)));
    ctx.body = {
      code: 200,
      message: '查询站点成功',
      result: res,
    };
  } catch (error) {
    console.error('查询站点失败', error);
    ctx.app.emit('error', addSiteError, ctx);
  }
};

export const findOption: Middleware = async (ctx) => {
  const { option_id } = ctx.state.site;
  try {
    const res = await findSiteOption(option_id);
    if (!res) {
      console.error('查询站点配置失败', { option_id });
      ctx.app.emit('error', siteOptionNotExist, ctx);
      return;
    }
    ctx.body = {
      code: 200,
      message: '查询站点配置成功',
      result: res,
    };
  } catch (error) {
    console.error('查询站点配置失败', error);
    ctx.app.emit('error', findSiteOptionError, ctx);
  }
};
