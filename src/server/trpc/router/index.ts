// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";

export const appRouter = t.router({
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
