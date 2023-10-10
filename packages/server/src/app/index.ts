import Koa from 'koa';
import KoaStatic from 'koa-static';
import path from 'node:path';

const app = new Koa();

app.use(KoaStatic(path.resolve(__dirname, '../track-sdk')));

export default app;
