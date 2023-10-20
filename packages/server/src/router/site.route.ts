import Router from 'koa-router';
import { auth } from '../middleware/auth.middleware';
import { verifySite, verifySiteInfo } from '../validator/site.validator';
import { crpySite } from '../middleware/site.middleware';
import { addSite, findOption } from '../controller/site.contrller';
const siteRouter = new Router({ prefix: '/site' });

// 后台接口
// 添加站点接口
siteRouter.post('/add', auth, verifySite, crpySite, addSite);

// 包接口
// 通过id查找站点配置信息
siteRouter.get('/:id', verifySiteInfo, findOption);

export default siteRouter;
