import type { ParameterizedContext } from 'koa';
interface Error {
  code: number;
  message: string;
  result: any;
}

export default function errHandler(err: Error, ctx: ParameterizedContext) {
  let status = 500;
  if (err.code) {
    status = err.code;
  }
  ctx.status = status;
  ctx.body = err;
}
