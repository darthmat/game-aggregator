import { FastifyInstance } from 'fastify';

export class HealthzRouter {
  register(fastify: FastifyInstance) {
    fastify.get('/healthz', async (req, res) => {
      const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      };
      try {
        res.send(healthcheck);
      } catch (error: unknown) {
        new Error('something went wrong');
        res.status(503).send();
      }
    });
  }
}
