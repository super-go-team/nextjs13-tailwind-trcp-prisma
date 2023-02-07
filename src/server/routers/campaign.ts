import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

const listHandler = publicProcedure.query(async ({ ctx }) => {
  const res = await ctx.prisma.campaign.findMany();
  return res;
});

export const campaignRouter = router({
    list: listHandler,
    put: publicProcedure
      .input(
        z.object({
          title: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await ctx.prisma.campaign.create({
          data: { title: input.title },
        });
      }),
    updateOne: publicProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string(),
          active: z.boolean(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { id, ...rest } = input;
  
        return await ctx.prisma.campaign.update({
          where: { id },
          data: { ...rest },
        });
      }),
    deleteAll: publicProcedure
      .input(
        z.object({
          ids: z.number().array(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { ids } = input;
  
        return await ctx.prisma.campaign.deleteMany({
          where: {
            id: { in: ids },
          },
        });
      }),
  });