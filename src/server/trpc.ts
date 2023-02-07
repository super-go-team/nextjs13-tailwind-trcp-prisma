import { Context } from "./context";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.context<Context>().create({
    transformer: SuperJSON
});

export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;
