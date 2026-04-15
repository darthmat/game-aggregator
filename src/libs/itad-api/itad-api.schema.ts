import z from 'zod';

export const itadGameDealResponseSchema = z
  .object({
    shop: z.object({
      id: z.number(),
      name: z.string(),
    }),
    price: z.object({
      amount: z.number(),
      amountInt: z.number(),
      currency: z.string(),
    }),
    platforms: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    ),
    expiry: z.string().nullable(),
    url: z.string(),
  })
  .transform(({ platforms, ...rest }) => ({
    ...rest,
    dealPlatforms: platforms,
  }));

export const itadGameInfoResponseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  developers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  publishers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});
