import type { Middleware } from "../deps.ts";

export const jsonPostBodyCheck: Middleware = async (ctx, next) => {
  if (
    !ctx.request.hasBody ||
    !ctx.request.body().type ||
    ctx.request.body().type !== "json"
  ) {
    ctx.response.status = 422;
    return;
  } else {
    await next();
  }
};
