import Router from 'koa-router';
import { auth } from '../middleware/auth.middleware';
import Site from '../model/site.model';
import { verifySite } from '../validator/site.validator';
import { crpySite } from '../middleware/site.middleware';
import { addSite } from '../controller/site.contrller';
const siteRouter = new Router({ prefix: '/site' });

// 添加站点接口
siteRouter.post('/add', auth, verifySite, crpySite, addSite);

// 通过id查找站点配置信息
siteRouter.get('/:id', auth, async (ctx) => {
  const { id } = ctx.params;
  return (ctx.body = {
    msg: 'hahah',
  });
});

export default siteRouter;
