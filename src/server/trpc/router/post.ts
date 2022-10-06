import { authedProcedure, t } from "../trpc";
import { z } from "zod";

export const postRouter = t.router({
  greeting: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: t.procedure.query(({ ctx }) => {
    console.log(ctx.session);
    return ctx.prisma.post.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      include: {
        author: true,
      },
    });
  }),
  create: authedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          author: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
});
