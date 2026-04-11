import { fastify } from 'fastify';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';

async function start() {
  const app = fastify();

  app.register(fastifyGracefulShutdown);
  try {
    await app.after(() => {
    app.gracefulShutdown(async (signal) => {
    app.log.info('Received signal to shutdown: %s', signal)
    })
}).listen({ port: 3000, listenTextResolver: (address) => `Server is running at http://${address}:3000` })
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start();