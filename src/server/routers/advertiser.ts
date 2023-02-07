import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

const listHandler = publicProcedure.query(async ({ ctx }) => {
  const res = await ctx.prisma.advertiser.findMany();
  return res;
});

async function request(url: string) {
  const headers = {
    "headers": {
      "accept": "application/json",
      "Access-Control-Allow-Origin": '*'
    }
  };
  const result = await fetch(url, headers).then(res => res.json());

  return result;
}
const toDate = (val:string) => new Date(val);
const starwars =
  publicProcedure
  .input(
    z.object({
      id: z.number().int().gte(6).optional()
    })
  )
  .output(
    z.object({
      cargo_capacity: z.string(),
      consumables: z.string(),
      cost_in_credits: z.string(),
      created: z.string(),
      crew: z.string(),
      edited: z.string().transform(toDate),
      length: z.string(),
      manufacturer: z.string(),
      max_atmosphering_speed: z.string(),
      model: z.string(),
      name: z.string(),
      passengers: z.string(),
      url: z.string(),
      vehicle_class: z.string(),
    })
  )
  .query(
    async ({input}) =>  await request(`https://swapi.dev/api/vehicles/${input.id ?? 4}`)
  );

export const advertiserRouter = router({
    list: listHandler,
    starwars,
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