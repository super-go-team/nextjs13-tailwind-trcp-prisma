import { advertiserRouter } from './advertiser';
import { router } from '../trpc';
import { groceryRouter } from './grocery';
import { campaignRouter } from './campaign';

export const appRouter = router({
  grocery: groceryRouter,
  campaign: campaignRouter,
  advertiser: advertiserRouter
});

export type AppRouter = typeof appRouter;
