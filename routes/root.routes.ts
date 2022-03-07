import { Router } from "../deps.ts";
import { leadsRouter } from "./lead.routes.ts";

const apiRouter = new Router();

apiRouter.get("/", (ctx) => {
  console.log(`Request received for api/v1 endpoint`);
  if (ctx.request?.headers?.get("origin") == "chikitsamitra.org") {
  } else {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized request" };
    return;
  }
});

apiRouter.use(leadsRouter.routes());

export { apiRouter };
