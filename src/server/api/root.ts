import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { entryRouter } from "./routers/entry";
import { valueRouter } from "./routers/value";
import { wheelRouter } from "./routers/wheel";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  entry: entryRouter,
  value: valueRouter,
  wheel: wheelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
