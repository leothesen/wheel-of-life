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
      // Create the entry
      const entry = await ctx.prisma.entries.create({
        data: {
          userId: ctx.auth.userId,
          title: input.entry.title,
          notes: input.entry.notes,
        },
      });

      // Get the user's values
      const userValues = await ctx.prisma.userValues.findMany({
        where: {
          userId: ctx.auth.userId,
        },
      });
      if (!userValues || userValues.length === 0)
        throw new Error("User has no values"); // shem

      // Map the ratings to a user value
      const mappedRatings = input.entry.ratings.map((rating) => {
        let userValue = userValues.find(
          (userValue) => userValue.value === Object.keys(rating)[0]
        );

        if (!userValue)
          throw new Error("User has no value for " + Object.keys(rating)[0]);

        const score = rating[userValue.value];

        const mappedRating = {
          userId: ctx.auth.userId,
          entryId: entry.id,
          userValueId: userValue.id,
          rating: parseInt(score || "0"),
        };

        return mappedRating;
      });

      // Create the ratings
      await ctx.prisma.entryRatings.createMany({
        data: mappedRatings,
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
