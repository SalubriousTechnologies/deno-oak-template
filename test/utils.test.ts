import { assertEquals } from "./setup.ts";

import { onlyAlphabetsAndNumbers } from "../utils/cleanup.ts";

Deno.test(
  "cleaned output should only have alphabets and digits in uppercase",
  () => {
    assertEquals(onlyAlphabetsAndNumbers("UP-31-AH-1231"), "UP31AH1231");
    assertEquals(onlyAlphabetsAndNumbers("UP-32 AH 015"), "UP32AH015");
    assertEquals(onlyAlphabetsAndNumbers("UP@32!AH*115%7"), "UP32AH1157");
  }
);
