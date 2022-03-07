export { join } from "https://deno.land/std@0.128.0/path/mod.ts";
export { walkSync } from "https://deno.land/std@0.128.0/fs/mod.ts";

import { Client, Pool } from "../deps.ts";

const DB_URL = Deno.env.get("TEST_DB_URL") || "";
const POOL_CONNECTIONS = 20;
let dbPool: Pool;

if (Deno.env.get("DENO_ENV")?.toLowerCase() === "production") {
  dbPool = new Pool(DB_URL, POOL_CONNECTIONS);
}

export async function dbConnection() {
  if (Deno.env.get("DENO_ENV") !== "production") {
    // client connection must be created each time for a request in development and testing
    const client = new Client(DB_URL);
    await client.connect();

    const freeUp = async () => await client.end();

    return { client, freeUp };
  } else {
    // pool connection
    const client = await dbPool.connect();
    const freeUp = () => client.release();

    return { client, freeUp };
  }
}
