import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const entryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        entry: z.object({
          title: z.string(),
          notes: z.string(),
          ratings: z
            .object({
              value: z.string(),
              rating: z.number(),
            })
            .array(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entries.create({
        data: {
          userId: ctx.auth.userId,
          title: input.entry.title,
          notes: input.entry.notes,
          ratings: input.entry.ratings
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany();
  }),
});
