import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const entryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany();
  }),
});
