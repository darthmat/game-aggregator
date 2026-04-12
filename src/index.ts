import { fastify } from 'fastify';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
import { container } from './container.js';
import { config } from './config.js';

async function start() {
  const app = fastify({ logger: true });
  const { healthzRouter } = await container(config);

  try {
    app.register(fastifyGracefulShutdown);

    healthzRouter.register(app);
    app.after(() => {
      app.gracefulShutdown(async (signal) => {
        app.log.info('Received signal to shutdown: %s', signal);
      });
    });

    await app.listen({
      port: config.port,
      host: '0.0.0.0',
      listenTextResolver: (address) => `Server is running at ${address}`,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

await start();
