import { app } from "./oakApp.ts";

const PORT = Deno.env.get("PORT") || "4000";

console.log(`Starting server on PORT ${PORT}`);
await app.listen({ port: parseInt(PORT) });
