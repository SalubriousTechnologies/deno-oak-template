import { Application, Router } from "./deps.ts";

import { apiRouter } from "./routes/root.routes.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const apiV1Router = new Router().use(
  "/api/v1",
  apiRouter.routes(),
  apiRouter.allowedMethods()
);

app.use(apiV1Router.routes());

export { app };
