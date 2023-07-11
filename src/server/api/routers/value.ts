import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const valueRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ values: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.values.create({
        data: {
          values: input.values,
          userId: ctx.auth.userId,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.values.findMany();
  }),
});
