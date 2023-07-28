import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const valueRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ values: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const valuesToSave = input.values.map((value) => ({
        value,
        userId: ctx.auth.userId,
      }));

      console.log(valuesToSave)

      await ctx.prisma.userValues.createMany({
        data: valuesToSave,
        skipDuplicates: true,
      });

      return input.values
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userValues.findMany();
  }),

  getUserValues: protectedProcedure.query(async ({ ctx }) => {
    const userValues = await ctx.prisma.userValues.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return userValues.map((userValue) => userValue.value);
  }),
});
