import { join } from "../../test/setup.ts";

import { genTimeStamp } from "../../utils/dateFunctions.ts";

Deno.writeTextFileSync(
  join(".", "db", "migrations", genTimeStamp() + `.sql`),
  "",
  {
    create: true,
  }
);
