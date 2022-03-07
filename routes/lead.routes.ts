import { Router } from "../deps.ts";
import { addLead, showLead } from "../controllers/leads.controller.ts";
import { jsonPostBodyCheck } from "../middlewares/jsonPostBodyCheck.ts";

const leadsRouter = new Router();

leadsRouter.post("/lead", jsonPostBodyCheck, addLead);
leadsRouter.get("/lead/:id", showLead);

export { leadsRouter };
