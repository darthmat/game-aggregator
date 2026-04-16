import { fastify } from 'fastify';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
import { config } from './config.js';
import { container } from './container.js';
import { dbConfig } from './dbConfig.js';
import fastifyRateLimit from '@fastify/rate-limit';
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod';

async function start() {
  const app = fastify({ logger: true });
  const { redis, db, healthzRouter, gameRouter, searchHistoryRouter } =
    await container(config, dbConfig);

  try {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(fastifyGracefulShutdown);
    app.register(fastifyRateLimit, {
      max: 30,
      timeWindow: '1 minute',
    });
    healthzRouter.register(app);
    gameRouter.register(app);
    searchHistoryRouter.register(app);

    app.after(() => {
      app.gracefulShutdown(async (signal) => {
        await Promise.all([db.destroy(), redis.quit()]);
        app.log.info('Received signal to shutdown: %s', signal);
      });
    });

    await app.listen({
      port: config.port,
      host: config.host,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

await start();
