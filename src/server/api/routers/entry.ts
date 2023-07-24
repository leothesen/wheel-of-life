import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const entryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        entry: z.object({
          title: z.string(),
          notes: z.string(),
          ratings: z.record(z.string(), z.string(), z.string()).array(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input)
      const entry = await ctx.prisma.entries.create({
        data: {
          userId: ctx.auth.userId,
          title: input.entry.title,
          notes: input.entry.notes,
        },
      });

      await ctx.prisma.entryRatings.createMany({
        data: input.entry.ratings.map((rating) => ({
          userId: ctx.auth.userId,
          entryId: entry.id,
          rating: rating.value,
          userValueId: rating.valueId,
        })),
      });

    }),
  getUserEntries: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
