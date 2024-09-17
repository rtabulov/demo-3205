import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import users from './users.json' with { type: 'json' };
import Fuse, { Expression } from 'fuse.js';
import { sleep } from './util.js';

type User = (typeof users)[number];

export const t = initTRPC.create();

export const appRouter = t.router({
  findUser: t.procedure
    .input(async (value) => {
      const schema = z.object({
        email: z.string().min(1, 'Please enter something'),
        number: z.string().optional(),
      });

      const { success, data, error } = await schema.safeParseAsync(value);

      if (!success) {
        await sleep(3000);
        throw error;
      }

      return data;
    })
    .query(async (opts) => {
      await sleep(3000);

      const fuse = new Fuse(users, {
        keys: ['email', 'number'],
        isCaseSensitive: false,
        findAllMatches: true,
        threshold: 0.2,
        ignoreLocation: true,
        useExtendedSearch: true,
        includeScore: true,
        ignoreFieldNorm: true,
      });

      const search: Required<Expression> = {
        $and: [{ email: opts.input.email }],
      };

      if (opts.input.number) {
        search.$and.push({ number: opts.input.number });
      }

      return fuse.search(search).map((item) => item.item);
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
