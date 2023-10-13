import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaBody, { HttpMethodEnum } from 'koa-body';
import path from 'node:path';
import router from '../router/index.route';
import errHandler from './errHandler';
import cors from 'koa2-cors';
const app = new Koa();

app
  .use(
    cors({
      maxAge: 3600, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
    })
  )
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
