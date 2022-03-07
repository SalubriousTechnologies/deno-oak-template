import { app, assertEquals, superoak } from "./setup.ts";
import { testDbClient } from "./setup.ts";

Deno.test({
  name: "can post to lead",
  fn: async () => {
    const request = await superoak(app);
    const { client, freeUp } = await testDbClient();
    try {
      const startCount = (
        await client.queryArray<bigint[]>("SELECT COUNT(*) FROM leads")
      ).rows[0][0];
      await request
        .post("/api/v1/lead")
        .set("Content-Type", "application/json")
        .send(
          JSON.stringify({
            id: 42,
            name: "alpha",
          })
        )
        .expect(201);
      const endCount = (
        await client.queryArray<bigint[]>("SELECT COUNT(*) FROM leads")
      ).rows[0][0];
      assertEquals(endCount - startCount, BigInt(1));
    } finally {
      await freeUp();
    }
  },
  ignore: false,
});
