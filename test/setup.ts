export { Router, testing } from "https://deno.land/x/oak@v10.4.0/mod.ts";
export type { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.128.0/testing/asserts.ts";
export { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

export { join } from "https://deno.land/std@0.128.0/path/mod.ts";
export { walkSync } from "https://deno.land/std@0.128.0/fs/mod.ts";

export { app } from "../oakApp.ts";

import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
const TEST_DB_URL = Deno.env.get("TEST_DB_URL");

export async function testDbClient() {
  const client = new Client(TEST_DB_URL);
  await client.connect();

  const freeUp = () => client.end();

  return { client, freeUp };
}
