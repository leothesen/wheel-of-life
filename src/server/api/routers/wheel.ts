import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  mapWheelCaptions,
  mapWheelData,
} from "../../domains/wheel/wheel.service";

export const wheelRouter = createTRPCRouter({
  getWheel: protectedProcedure.query(async ({ ctx }) => {
    /** Get the ratings that will populate the data */
    const values = await ctx.prisma.userValues.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });

    const entries = await ctx.prisma.entries.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      include: {
        ratings: true,
      },
    });

    const mappedWheelRatings = mapWheelData(values, entries);

    /** Map the captions */
    const mappedWheelCaptions = mapWheelCaptions(values);

    console.log(mappedWheelRatings)

    return {
      data: mappedWheelRatings,
      captions: mappedWheelCaptions,
    };
  }),
});
