import type { Context, RouterContext } from "../deps.ts";

import { Evaluation, findEvaluation } from "../models/Lead.ts";

interface LeadData {
  evaluatorId: number;
  registrationNumber: string;
  quotationOffered: number;
}

export async function addLead(ctx: Context) {
  //   const { evaluatorId, registrationNumber, quotationOffered }: EvaluationData =
  //     await ctx.request.body().value;
  //   const { isValid, message } = inputValidationForEvaluation(
  //     evaluatorId,
  //     registrationNumber,
  //     quotationOffered
  //   );
  //   if (!isValid) {
  //     ctx.response.status = 422;
  //     ctx.response.body = { message };
  //   } else {
  //     try {
  //       const evaluation = new Evaluation(
  //         evaluatorId,
  //         registrationNumber,
  //         quotationOffered
  //       );
  //       await evaluation.save();
  //       ctx.response.status = 201;
  //     } catch (e) {
  //       console.error(e);
  //       ctx.response.status = 422;
  //       return;
  //     }
  //   }
  await Promise.resolve();
  ctx.response.status = 201;
  return;
}

export async function showLead(ctx: RouterContext<"/lead/:id">) {
  //   try {
  //     if (ctx.params?.id) {
  //       const data = await findEvaluation(parseInt(ctx.params.id));
  //       ctx.response.body = JSON.stringify(data);
  //       ctx.response.status = 200;
  //     } else {
  //       ctx.response.status = 422;
  //       ctx.response.body = JSON.stringify({ message: "Invalid Id passed" });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     ctx.response.status = 500;
  //     ctx.response.body = JSON.stringify({ message: "Error in fetching record" });
  //   }
  await Promise.resolve();
  ctx.response.status = 200;
  ctx.response.body = JSON.stringify({ lead: { id: 1, name: "TEST" } });
  return;
}
