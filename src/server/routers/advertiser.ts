import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

const listHandler = publicProcedure.query(async ({ ctx }) => {
  const res = await ctx.prisma.advertiser.findMany();
  return res;
});

export const advertiserRouter = router({
    list: listHandler,
    put: publicProcedure
      .input(
        z.object({
          title: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await ctx.prisma.advertiser.create({
          data: { name: input.title},
        });
      }),
    patch: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { id, ...rest } = input;
  
        return await ctx.prisma.advertiser.update({
          where: { id },
          data: { ...rest },
        });
      }),
    delete: publicProcedure
      .input(
        z.object({
          ids: z.number().array(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { ids } = input;
  
        return await ctx.prisma.advertiser.deleteMany({
          where: {
            id: { in: ids },
          },
        });
      }),
  });