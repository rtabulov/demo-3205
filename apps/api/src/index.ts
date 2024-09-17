import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { appRouter, type AppRouter } from '@repo/trpc/router';
import Fastify from 'fastify';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
import url from 'node:url';
const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  maxParamLength: 5000,
});

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log({ dirname: import.meta.dirname });

server.register(fastifyStatic, {
  root: path.join(import.meta.dirname, '../../web/dist'),
  prefix: '/',
  constraints: {},
});

server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  trpcOptions: {
    router: appRouter,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
