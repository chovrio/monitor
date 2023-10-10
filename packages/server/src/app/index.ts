import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaBody, { HttpMethodEnum } from 'koa-body';
import path from 'node:path';
import router from '../router/index.route';
import errHandler from './errHandler';

const app = new Koa();

app
  .use(
    KoaBody({
      multipart: true,
      formidable: {
        // 在配置选项option里，不推荐使用相对路径
        // 在option里的相对路径，不是相对的当前路径。相对process.cew()
        // uploadDir: './src/uploads',
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
      },
      parsedMethods: [
        HttpMethodEnum.GET,
        HttpMethodEnum.POST,
        HttpMethodEnum.DELETE,
        HttpMethodEnum.PUT,
      ],
    })
  )
  .use(KoaStatic(path.resolve(__dirname, '../track-sdk')))
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', errHandler);

export default app;
